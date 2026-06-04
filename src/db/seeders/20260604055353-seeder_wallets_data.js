"use strict";

// BẢNG: wallets
// Chạy SAU users
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "wallets",
      [
        {
          user_id: 1,
          balance: 0.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 2,
          balance: 18500000.0,
          last_received_at: new Date("2025-05-28"),
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 3,
          balance: 12300000.0,
          last_received_at: new Date("2025-05-20"),
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 4,
          balance: 9800000.0,
          last_received_at: new Date("2025-05-15"),
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 5,
          balance: 22100000.0,
          last_received_at: new Date("2025-06-01"),
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 6,
          balance: 15600000.0,
          last_received_at: new Date("2025-05-25"),
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 7,
          balance: 500000.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 8,
          balance: 200000.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 9,
          balance: 750000.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 10,
          balance: 0.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 11,
          balance: 300000.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 12,
          balance: 1200000.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 13,
          balance: 0.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          user_id: 14,
          balance: 0.0,
          last_received_at: null,
          created_at: now,
          updated_at: now,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("wallets", null, {});
  },
};
