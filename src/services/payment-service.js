require("dotenv").config();

// @lib
const moment = require("moment");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const qs = require("qs");

const { randomBytes } = require("crypto");
const querystring = require("querystring"); // Dùng querystring thay vì qs
const asyncHandler = require("express-async-handler");
const axios = require("axios");

// @repo
const { update_order } = require("../Repository/order-detail-repo");

const config = {
  app_id: process.env.ZALO_PAY_APP_ID,
  key1: process.env.ZALO_PAY_KEY_1,
  key2: process.env.ZALO_PAY_KEY_2,
  endpoint: process.env.ZALO_PAY_ENDPOINT,
};

const EMBED_DATA = {
  MERCHANT_INFO: "embeddata123",
  REDIRECT_URL: " http://localhost:5173/",
};
const MERCHANT_INFO = {
  APP_USER: "Bonsai sold & Caring My Ngoc Store",
  DESCRIPTION: "System support My Ngoc store sold & caring bonsai in home ",
  CALLBACK_URL: "https://2508fe71351eee.lhr.life/api/v1/payments/callback",
  // CALLBACK_URL:
  //   'https://ce5f-113-169-52-129.ngrok-free.app/api/v1/payments/callback',
};

class PaymentService {
  static create_vpn_url = asyncHandler(async (req, payload) => {
    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");

    const generateRandomString = (length) => {
      const bytes = randomBytes(Math.ceil(length / 2));
      return bytes.toString("hex").slice(0, length);
    };

    const ipAddr =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_SECRET;
    let vnpUrl = process.env.VNP_URL;

    const bankCode = "NCB";
    const orderId = generateRandomString(10);

    const bookingDate = payload?.order_id;
    const amount = bookingDate?.data?.totalAmount ?? 0;
    const locale = "vn";

    const currCode = "VND";
    const orderInfor = `${bookingDate}`;

    let returnUrl = `https://e446-2405-4802-8015-93a0-4da9-f4b4-5e36-7c1c.ngrok-free.app/`;

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfor,
      vnp_OrderType: "other",
      vnp_Amount: payload.total * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: createDate,
      vnp_BankCode: "NCB",
    };

    if (bankCode) {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    const sortObject = (obj) => {
      const sorted = {};
      const str = [];
      let key;
      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          str.push(encodeURIComponent(key));
        }
      }
      str.sort();
      for (key of str) {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
      }
      return sorted;
    };

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, null, null, {
      encode: false,
    });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    vnpUrl +=
      "?" + querystring.stringify(vnp_Params, null, null, { encode: false });

    console.log(vnp_Params["vnp_ReturnUrl"], "Generated Payment URL");

    return vnpUrl;
  });

  static return_ipn = asyncHandler(async (req) => {
    const sortObject = (obj) => {
      const sorted = {};
      const str = [];
      let key;
      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          str.push(encodeURIComponent(key));
        }
      }
      str.sort();
      for (key of str) {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
      }
      return sorted;
    };

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_SECRET;

    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, null, null, {
      encode: false,
    });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    // Kiểm tra hash có khớp không
    if (secureHash === signed) {
      var orderInfo = vnp_Params["vnp_OrderInfo"];
      const res = await update_order(orderInfo, { status: 1 });
      return res; // Cập nhật trạng thái đơn hàng và trả kết quả
    } else {
      return {
        data: "ok", // Trả về kết quả mặc định nếu không khớp
      };
    }
  });

  static create_zalo = asyncHandler(async (payload) => {
    const embed_data = {
      merchantinfo: EMBED_DATA.MERCHANT_INFO,
      redirecturl: EMBED_DATA.REDIRECT_URL,
    };
    const items = [
      {
        id: payload.id,
        user_id: payload?.user_id,
      },
    ];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: MERCHANT_INFO.APP_USER,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: payload.amount,
      description: MERCHANT_INFO.DESCRIPTION,
      bank_code: "",
      callback_url: MERCHANT_INFO.CALLBACK_URL,
      mac: "",
    };
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const result = await axios.post(config.endpoint, null, { params: order });
      console.log("result", result.data);

      // await this.ordersService.update_status_payment_processing(
      //   paymentDto.order_info?.id,
      // );

      return result.data?.order_url;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  });
}

module.exports = PaymentService;
