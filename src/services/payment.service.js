const { momoConfig } = require("@/configs/payment");
const handleRawSignature = require("@/utils/rawSignature");
const { default: axios } = require("axios");
const { Booking, Payment } = require("@/models");

class PaymentService {
  async createMomoPayment(booking_id) {
    const booking = await Booking.findOne({
      where: { id: booking_id, status: "pending" },
    });

    if (!booking) {
      throw new Error("Booking không tồn tại!");
    }

    const { secretKey, ...data } = momoConfig;
    var orderId = data.partnerCode + new Date().getTime();
    var requestId = orderId;
    const amount = Math.round(Number(booking.total_price));
    var rawSignature = handleRawSignature({
      ...data,
      orderId,
      amount,
      requestId,
    });

    //signature
    const crypto = require("crypto");
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const existingPayment = await Payment.findOne({
      where: {
        booking_id,
        provider: "momo",
        status: "pending",
      },
    });

    if (existingPayment) {
      throw new Error("Đã tồn tại đơn cho booking này rồi!");
    }

    await Payment.create({
      booking_id,
      provider: "momo",
      amount,
      status: "pending",
      provider_order_id: orderId,
    });

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      ...data,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      signature: signature,
    });
    const result = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      },
    );
    return result.data;
  }
}

module.exports = new PaymentService();
