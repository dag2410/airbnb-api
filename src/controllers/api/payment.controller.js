const paymentService = require("@/services/payment.service");
const { success, error } = require("@/utils/response");
const queue = require("@/utils/queue");

exports.createMomoPayment = async (req, res) => {
  try {
    const { booking_id } = req.body;
    const response = await paymentService.createMomoPayment(booking_id);
    success(res, 200, response);
  } catch (err) {
    console.error(err);
    error(res, 500, "Lỗi xảy ra khi tạo payment!", err.message);
  }
};

exports.momoCallback = async (req, res) => {
  try {
    queue.dispatch("handlePaymentResult", req.body);
    success(res, 200, "Callback thành công!");
  } catch (err) {
    console.error(err);
    error(res, 500, "Lỗi xảy ra khi nhận callback!", err.message);
  }
};
