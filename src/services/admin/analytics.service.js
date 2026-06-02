const { Op, fn, col, literal, QueryTypes } = require("sequelize");
const { User, Booking, Payment, Room, sequelize } = require("@/models");
const { percentChange } = require("@/utils/dateRange");

class AnalyticsService {
  _dateWhere(field, range) {
    return {
      [field]: { [Op.between]: [range.start, range.end] },
    };
  }

  _prevDateWhere(field, range) {
    return {
      [field]: { [Op.between]: [range.prevStart, range.prevEnd] },
    };
  }

  _groupFormat(range) {
    if (range.days <= 31) return "%Y-%m-%d";
    if (range.days <= 90) return "%Y-%u";
    return "%Y-%m";
  }

  async _sumRevenue(where) {
    const total = await Payment.sum("amount", {
      where: { ...where, status: "paid" },
    });
    return Number(total) || 0;
  }

  async _countBookings(where) {
    return Booking.count({ where });
  }

  async _countNewUsers(where) {
    return User.count({ where });
  }

  async getSummary(range) {
    const [
      revenue,
      prevRevenue,
      bookings,
      prevBookings,
      newUsers,
      prevNewUsers,
      paidCount,
      prevPaidCount,
    ] = await Promise.all([
      this._sumRevenue(this._dateWhere("paid_at", range)),
      this._sumRevenue(this._prevDateWhere("paid_at", range)),
      this._countBookings(this._dateWhere("created_at", range)),
      this._countBookings(this._prevDateWhere("created_at", range)),
      this._countNewUsers(this._dateWhere("created_at", range)),
      this._countNewUsers(this._prevDateWhere("created_at", range)),
      Payment.count({
        where: {
          status: "paid",
          ...this._dateWhere("paid_at", range),
        },
      }),
      Payment.count({
        where: {
          status: "paid",
          ...this._prevDateWhere("paid_at", range),
        },
      }),
    ]);

    const avgBookingValue = bookings > 0 ? revenue / bookings : 0;
    const prevAvgBookingValue =
      prevBookings > 0 ? prevRevenue / prevBookings : 0;
    const conversionRate =
      bookings > 0 ? Number(((paidCount / bookings) * 100).toFixed(1)) : 0;
    const prevConversionRate =
      prevBookings > 0
        ? Number(((prevPaidCount / prevBookings) * 100).toFixed(1))
        : 0;

    const metric = (value, previous) => ({
      value,
      previous,
      change: percentChange(value, previous),
      trend: value >= previous ? "up" : "down",
    });

    return {
      revenue: metric(revenue, prevRevenue),
      bookings: metric(bookings, prevBookings),
      newUsers: metric(newUsers, prevNewUsers),
      avgBookingValue: metric(
        Math.round(avgBookingValue),
        Math.round(prevAvgBookingValue),
      ),
      paidPayments: metric(paidCount, prevPaidCount),
      conversionRate: metric(conversionRate, prevConversionRate),
    };
  }

  async getTimeSeries(
    model,
    dateField,
    start,
    end,
    days,
    { sumField = null, extraWhere = {} } = {},
  ) {
    const format =
      days <= 31 ? "%Y-%m-%d" : days <= 90 ? "%Y-%u" : "%Y-%m";
    const attributes = [
      [fn("DATE_FORMAT", col(dateField), format), "period"],
    ];

    if (sumField) {
      attributes.push([fn("SUM", col(sumField)), "total"]);
    } else {
      attributes.push([fn("COUNT", col("id")), "total"]);
    }

    const rows = await model.findAll({
      attributes,
      where: {
        [dateField]: { [Op.between]: [start, end] },
        ...extraWhere,
      },
      group: [fn("DATE_FORMAT", col(dateField), format)],
      order: [[literal("period"), "ASC"]],
      raw: true,
    });

    return rows.map((r) => ({
      period: r.period,
      value: Number(r.total) || 0,
    }));
  }

  async getRevenueComparison(range) {
    const paidFilter = { status: "paid" };
    const current = await this.getTimeSeries(
      Payment,
      "paid_at",
      range.start,
      range.end,
      range.days,
      { sumField: "amount", extraWhere: paidFilter },
    );
    const prev = await this.getTimeSeries(
      Payment,
      "paid_at",
      range.prevStart,
      range.prevEnd,
      range.days,
      { sumField: "amount", extraWhere: paidFilter },
    );

    const toMap = (rows) =>
      rows.reduce((acc, r) => {
        acc[r.period] = r.value;
        return acc;
      }, {});

    const curMap = toMap(current);
    const prevMap = toMap(prev);

    return {
      labels: current.map((r) => r.period),
      current: current.map((r) => r.value),
      previous: current.map((r) => prevMap[r.period] || 0),
    };
  }

  async getBookingsComparison(range) {
    const current = await this.getTimeSeries(
      Booking,
      "created_at",
      range.start,
      range.end,
      range.days,
    );
    const prev = await this.getTimeSeries(
      Booking,
      "created_at",
      range.prevStart,
      range.prevEnd,
      range.days,
    );

    const prevMap = prev.reduce((acc, r) => {
      acc[r.period] = r.value;
      return acc;
    }, {});

    return {
      labels: current.map((r) => r.period),
      current: current.map((r) => r.value),
      previous: current.map((r) => prevMap[r.period] || 0),
    };
  }

  async getNewUsersSeries(range) {
    const rows = await this.getTimeSeries(
      User,
      "created_at",
      range.start,
      range.end,
      range.days,
    );
    return {
      labels: rows.map((r) => r.period),
      data: rows.map((r) => r.value),
    };
  }

  async getBookingStatusBreakdown(range) {
    const rows = await Booking.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: this._dateWhere("created_at", range),
      group: ["status"],
      raw: true,
    });

    return {
      labels: rows.map((r) => r.status),
      data: rows.map((r) => Number(r.count)),
    };
  }

  async getPaymentProviderBreakdown(range) {
    const rows = await Payment.findAll({
      attributes: ["provider", [fn("SUM", col("amount")), "total"]],
      where: {
        status: "paid",
        ...this._dateWhere("paid_at", range),
      },
      group: ["provider"],
      raw: true,
    });

    return {
      labels: rows.map((r) => r.provider?.toUpperCase() || "N/A"),
      data: rows.map((r) => Number(r.total) || 0),
    };
  }

  async getPaymentStatusBreakdown(range) {
    const rows = await Payment.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: this._dateWhere("created_at", range),
      group: ["status"],
      raw: true,
    });

    return {
      labels: rows.map((r) => r.status),
      data: rows.map((r) => Number(r.count)),
    };
  }

  async getTopRooms(range, limit = 10) {
    const rows = await Booking.findAll({
      attributes: [
        "room_id",
        [fn("COUNT", col("Booking.id")), "booking_count"],
        [fn("SUM", col("total_price")), "total_revenue"],
      ],
      where: this._dateWhere("created_at", range),
      include: [
        {
          model: Room,
          as: "room",
          attributes: ["id", "title", "slug", "room_city", "price_per_night"],
        },
      ],
      group: ["room_id", "room.id"],
      order: [[literal("booking_count"), "DESC"]],
      limit,
      subQuery: false,
    });

    return rows.map((r) => ({
      room_id: r.room_id,
      title: r.room?.title || `Room #${r.room_id}`,
      city: r.room?.room_city || "—",
      booking_count: Number(r.get("booking_count")),
      total_revenue: Number(r.get("total_revenue")) || 0,
    }));
  }

  async getTopCities(range, limit = 8) {
    const rows = await sequelize.query(
      `SELECT r.room_city AS city, COUNT(b.id) AS booking_count
       FROM bookings b
       INNER JOIN rooms r ON b.room_id = r.id
       WHERE b.created_at BETWEEN :start AND :end
         AND r.room_city IS NOT NULL AND r.room_city != ''
       GROUP BY r.room_city
       ORDER BY booking_count DESC
       LIMIT :limit`,
      {
        replacements: {
          start: range.start,
          end: range.end,
          limit,
        },
        type: QueryTypes.SELECT,
      },
    );

    return rows.map((r) => ({
      city: r.city,
      booking_count: Number(r.booking_count),
    }));
  }

  async getAnalytics(range) {
    const [
      summary,
      revenueChart,
      bookingsChart,
      newUsersChart,
      bookingStatus,
      paymentProvider,
      paymentStatus,
      topRooms,
      topCities,
    ] = await Promise.all([
      this.getSummary(range),
      this.getRevenueComparison(range),
      this.getBookingsComparison(range),
      this.getNewUsersSeries(range),
      this.getBookingStatusBreakdown(range),
      this.getPaymentProviderBreakdown(range),
      this.getPaymentStatusBreakdown(range),
      this.getTopRooms(range),
      this.getTopCities(range),
    ]);

    return {
      summary,
      charts: {
        revenue: revenueChart,
        bookings: bookingsChart,
        newUsers: newUsersChart,
        bookingStatus,
        paymentProvider,
        paymentStatus,
      },
      topRooms,
      topCities,
    };
  }
}

module.exports = new AnalyticsService();
