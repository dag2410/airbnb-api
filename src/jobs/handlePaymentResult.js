const { Booking, Payment, Room, Wallet, sequelize } = require("@/models");

async function handlePaymentResult(job) {
  const transaction = await sequelize.transaction();
  try {
    const now = new Date();

    const { orderId, resultCode, transId, message } = JSON.parse(job.payload);

    const payment = await Payment.findOne({
      where: {
        provider_order_id: orderId,
        provider: "momo",
      },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!payment) {
      console.error(`Không tìm thấy payment với orderId: ${orderId}`);
      await transaction.rollback();
      return;
    }

    if (payment.status !== "pending") {
      console.error(
        `Payment với orderId: ${orderId} đã được xử lý trước đó với status: ${payment.status}`,
      );
      await transaction.rollback();
      return;
    }

    const booking = await Booking.findOne({
      where: {
        id: payment.booking_id,
      },
      transaction,
    });

    if (!booking) {
      console.error(`Không tìm thấy booking với id: ${payment.booking_id}`);
      await transaction.rollback();
      return;
    }

    switch (resultCode) {
      // case success
      case 0:
        {
          if (booking.status === "cancelled") {
            throw new Error(
              `Booking với id: ${booking.id} đã bị hủy trước đó!`,
            );
          }

          await payment.update(
            {
              transaction_id: transId,
              status: "paid",
              paid_at: now,
            },
            {
              transaction,
            },
          );

          await booking.update(
            { status: "confirmed" },
            {
              transaction,
            },
          );
          console.log(`[MOMO SUCCESS] ${orderId} | ${message}`);
        }

        const room = await Room.findByPk(booking.room_id, { transaction });

        if (!room) {
          throw new Error(`Không tìm thấy room với id: ${booking.room_id}`);
        }

        const hostWallet = await Wallet.findOne({
          where: {
            user_id: room.user_id,
          },
          transaction,
        });

        if (hostWallet) {
          hostWallet.balance =
            Number(hostWallet.balance) + Number(payment.amount);
          hostWallet.last_received_at = now;
          await hostWallet.save({ transaction });
        } else {
          await Wallet.create(
            {
              user_id: room.user_id,
              balance: payment.amount,
              last_received_at: now,
            },
            {
              transaction,
            },
          );
        }

        break;

      // case processing
      case 7000:
      case 7002:
      case 9000:
        await payment.update(
          {
            status: "processing",
          },
          {
            transaction,
          },
        );
        console.log(`[MOMO PROCESSING] ${orderId} | ${message}`);
        break;

      // case failed
      default:
        await payment.update(
          {
            status: "failed",
          },
          {
            transaction,
          },
        );
        console.log(`[MOMO FAILED] ${orderId} | ${message}`);
        break;
    }

    await transaction.commit();
  } catch (err) {
    console.error("Lỗi khi xử lí mã thanh toán", err);
    await transaction.rollback();
  }
}

module.exports = handlePaymentResult;
