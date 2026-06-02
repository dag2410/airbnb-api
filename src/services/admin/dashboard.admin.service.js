const { Op, fn, col, literal } = require("sequelize");
const { User, Booking, Payment } = require("@/models");

/**
 * Service chỉ phục vụ Admin Dashboard — không ảnh hưởng API/queue.
 */
class AdminDashboardService {
  async getStats() {
    const [totalUsers, totalBookings, totalPayments, totalRevenue] =
      await Promise.all([
        User.count(),
        Booking.count(),
        Payment.count(),
        Payment.sum("amount", { where: { status: "paid" } }),
      ]);

    return {
      totalUsers,
      totalBookings,
      totalPayments,
      totalRevenue: Number(totalRevenue) || 0,
    };
  }

  async getLatestBookings(limit = 8) {
    return Booking.findAll({
      limit,
      order: [["created_at", "DESC"]],
      include: [
        { association: "user", attributes: ["id", "email", "first_name", "last_name", "username"] },
        { association: "room", attributes: ["id", "title"] },
      ],
    });
  }

  async getLatestPayments(limit = 8) {
    return Payment.findAll({
      limit,
      order: [["created_at", "DESC"]],
      include: [
        {
          association: "booking",
          attributes: ["id"],
          include: [
            { association: "user", attributes: ["id", "email", "first_name", "last_name"] },
          ],
        },
      ],
    });
  }

  async getMonthlyRevenue(limit = 6) {
    return Payment.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("paid_at"), "%Y-%m"), "month"],
        [fn("SUM", col("amount")), "total"],
      ],
      where: { status: "paid", paid_at: { [Op.ne]: null } },
      group: [fn("DATE_FORMAT", col("paid_at"), "%Y-%m")],
      order: [[literal("month"), "ASC"]],
      limit,
      raw: true,
    });
  }

  async getOverview() {
    const [stats, latestBookings, latestPayments, monthlyRevenue] =
      await Promise.all([
        this.getStats(),
        this.getLatestBookings(),
        this.getLatestPayments(),
        this.getMonthlyRevenue(),
      ]);

    return { stats, latestBookings, latestPayments, monthlyRevenue };
  }
}

module.exports = new AdminDashboardService();
