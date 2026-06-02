const { Op } = require("sequelize");
const { Booking, sequelize } = require("@/models");
const { parsePagination, buildPaginationMeta } = require("@/utils/pagination");

const includes = [
  { association: "user", attributes: ["id", "email", "first_name", "last_name", "username"] },
  { association: "room", attributes: ["id", "title", "slug"] },
];

class AdminBookingService {
  async paginate(filters = {}) {
    const { page, limit, offset } = parsePagination(filters);
    const where = {};

    if (filters.status) where.status = filters.status;
    if (filters.search && !isNaN(parseInt(filters.search, 10))) {
      where.id = parseInt(filters.search, 10);
    }

    const { rows, count } = await Booking.findAndCountAll({
      where,
      include: includes,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      distinct: true,
    });

    return {
      data: rows,
      pagination: buildPaginationMeta({ total: count, page, limit }),
      filters,
    };
  }

  async getById(id) {
    return Booking.findByPk(id, { include: includes });
  }

  async updateStatus(id, status) {
    return sequelize.transaction(async (transaction) => {
      const booking = await Booking.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!booking) return null;
      await booking.update({ status }, { transaction });
      return booking;
    });
  }

  async update(id, data) {
    const booking = await Booking.findByPk(id);
    if (!booking) return null;
    await booking.update(data);
    return this.getById(id);
  }

  async remove(id) {
    const booking = await Booking.findByPk(id);
    if (!booking) return false;
    await booking.destroy();
    return true;
  }
}

module.exports = new AdminBookingService();
