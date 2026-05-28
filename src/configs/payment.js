const momoConfig = {
  accessKey: process.env.MOMO_ACCESS_KEY,
  secretKey: process.env.MOMO_SECRET_KEY,
  orderInfo: "Thanh toán qua MoMo",
  partnerCode: "MOMO",
  redirectUrl: process.env.MOMO_REDIRECT_URL,
  ipnUrl: process.env.MOMO_IPN_URL,
  requestType: "payWithMethod",
  extraData: "",
  orderGroupId: "",
  autoCapture: true,
  lang: "vi",
};

// const vnPayConfig = {
//   accessKey: process.env.MOMO_ACCESS_KEY,
//   secretKey: process.env.MOMO_SECRET_KEY,
//   orderInfo: "Thanh toán qua MoMo",
//   partnerCode: "MOMO",
//   redirectUrl: process.env.MOMO_REDIRECT_URL,
//   ipnUrl: process.env.MOMO_IPN_URL, //chú ý: cần dùng ngrok thì momo mới post đến url này được
//   requestType: "payWithMethod",
//   extraData: "",
//   orderGroupId: "",
//   autoCapture: true,
//   lang: "vi",
// };

module.exports = {
  momoConfig,
  //   vnPayConfig,
};
