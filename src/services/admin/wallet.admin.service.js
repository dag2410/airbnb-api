const { Op } = require("sequelize");
const { Wallet, User, sequelize } = require("@/models");
const { parsePagination, buildPaginationMeta } = require("@/utils/pagination");

class AdminWalletService {
  async paginate(filters = {}) {
    const { page, limit, offset } = parsePagination(filters);
    const where = {};
    const userWhere = {};

    if (filters.search) {
      const term = `%${String(filters.search).trim()}%`;
      userWhere[Op.or] = [
        { email: { [Op.like]: term } },
        { username: { [Op.like]: term } },
      ];
    }

    const { rows, count } = await Wallet.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "first_name", "last_name", "username"],
          where: Object.keys(userWhere).length ? userWhere : undefined,
          required: Object.keys(userWhere).length > 0,
        },
      ],
      limit,
      offset,
      order: [["updated_at", "DESC"]],
    });

    return {
      data: rows,
      pagination: buildPaginationMeta({ total: count, page, limit }),
      filters,
    };
  }

  async getById(id) {
    return Wallet.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "first_name", "last_name", "username"],
        },
      ],
    });
  }

  async create({ user_id, balance = 0 }) {
    return sequelize.transaction(async (transaction) => {
      const existing = await Wallet.findOne({ where: { user_id }, transaction });
      if (existing) throw new Error("User đã có ví.");
      return Wallet.create({ user_id, balance }, { transaction });
    });
  }

  async adjustBalance(walletId, amount, { type = "credit" } = {}) {
    return sequelize.transaction(async (transaction) => {
      const wallet = await Wallet.findByPk(walletId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!wallet) throw new Error("Ví không tồn tại.");

      const delta = Number(amount);
      if (!Number.isFinite(delta) || delta <= 0) {
        throw new Error("Số tiền không hợp lệ.");
      }

      const newBalance =
        type === "debit"
          ? Number(wallet.balance) - delta
          : Number(wallet.balance) + delta;

      if (newBalance < 0) throw new Error("Số dư ví không đủ.");

      await wallet.update(
        {
          balance: newBalance,
          last_received_at:
            type === "credit" ? new Date() : wallet.last_received_at,
        },
        { transaction },
      );
      return wallet;
    });
  }

  async remove(id) {
    const wallet = await Wallet.findByPk(id);
    if (!wallet) return false;
    await wallet.destroy();
    return true;
  }
}

module.exports = new AdminWalletService();
