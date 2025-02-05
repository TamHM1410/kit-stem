const auth = require("./auth-routes");
const product = require("./product-routes");
const password = require("./password-routes");
const user = require("./user-routes");
const paymentMethod = require("./payment-method-routes");
const category = require("./category-routes");
const subCategory = require("./sub-category-routes");
const inventory = require("./inventory-routes");
const products = require("./products-routes");
const conversationRouter = require("./conversation-routes");
const psqlRoute = require("./pqsl-route");
const stemRouter = require("./stem-routes");
const uploadRouter = require("./upload-routes");
const cartRouter = require("./cart-route");
const courseRouter = require("./course-route");
const lessonRouter = require("./lesson-route");
const paymentRouter = require("./payment-routes");
const orderRouter = require("./order-route");
const shipRouter = require("./ship-routes");


var predictVersionUrl = "/api/v1";
const webApi = (app) => {
  app.use("/api/v1", auth);

  app.use(predictVersionUrl, product);
  app.use(predictVersionUrl, password),
  app.use(predictVersionUrl, user);
  app.use(predictVersionUrl, paymentMethod);
  app.use(predictVersionUrl, category);
  app.use(predictVersionUrl, subCategory);
  app.use(predictVersionUrl, inventory);
  app.use(predictVersionUrl, products);
  app.use(predictVersionUrl, conversationRouter);
  app.use(predictVersionUrl, psqlRoute);
  app.use(predictVersionUrl, stemRouter);
  app.use(predictVersionUrl, uploadRouter);
  app.use(predictVersionUrl, cartRouter);
  app.use(predictVersionUrl, courseRouter);
  app.use(predictVersionUrl, lessonRouter);
  app.use(predictVersionUrl, paymentRouter);
  app.use(predictVersionUrl, orderRouter);
  app.use(predictVersionUrl, shipRouter);

};

module.exports = webApi;
