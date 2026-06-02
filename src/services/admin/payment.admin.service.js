const { Op } = require("sequelize");
const { Payment } = require("@/models");
const { parsePagination, buildPaginationMeta } = require("@/utils/pagination");

class AdminPaymentService {
  async paginate(filters = {}) {
    const { page, limit, offset } = parsePagination(filters);
    const where = {};

    if (filters.status) where.status = filters.status;
    if (filters.provider) where.provider = filters.provider;
    if (filters.search) {
      const term = `%${String(filters.search).trim()}%`;
      where[Op.or] = [
        { provider_order_id: { [Op.like]: term } },
        { transaction_id: { [Op.like]: term } },
      ];
    }

    const { rows, count } = await Payment.findAndCountAll({
      where,
      include: [
        {
          association: "booking",
          include: [
            { association: "user", attributes: ["id", "email", "first_name", "last_name"] },
            { association: "room", attributes: ["id", "title"] },
          ],
        },
      ],
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
    return Payment.findByPk(id, {
      include: [
        {
          association: "booking",
          include: [{ association: "user" }, { association: "room" }],
        },
      ],
    });
  }

  async updateStatus(id, status) {
    const payment = await Payment.findByPk(id);
    if (!payment) return null;
    await payment.update({ status });
    return payment;
  }

  async remove(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) return false;
    await payment.destroy();
    return true;
  }
}

module.exports = new AdminPaymentService();
