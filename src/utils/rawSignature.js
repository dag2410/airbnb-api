const handleRawSignature = (data) => {
  const { amount, requestId } = data;
  var rawSignature =
    "accessKey=" +
    data.accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    data.extraData +
    "&ipnUrl=" +
    data.ipnUrl +
    "&orderId=" +
    data.orderId +
    "&orderInfo=" +
    data.orderInfo +
    "&partnerCode=" +
    data.partnerCode +
    "&redirectUrl=" +
    data.redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    data.requestType;

  return rawSignature;
};

module.exports = handleRawSignature;
