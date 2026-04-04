require("dotenv").config();
require("module-alias/register");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

// const flash = require("express-flash");
const router = require("@/routes/api");
// const adminRouter = require("@/routes/admin");
const notFoundHandler = require("@/middleware/notFoundHandler");
const handleErrors = require("@/middleware/handleErrors");
// const handleSidebar = require("@/middleware/admin/handleSidebar");
// const session = require("@/middleware/admin/session");
// const shareLocals = require("@/middleware/admin/shareLocals");
// const checkAuth = require("@/middleware/admin/checkAuth");

const app = express();
const port = 3000;

// const isProduction = process.env.NODE_ENV === "production";

app.use(cookieParser());
app.use(
  cors({
    // isProduction ? "https://airbnb.io.vn"
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.static("public"));
app.use(express.json()); //parse fetch/xhr body : content type :application/json
app.use(express.urlencoded({ extended: true })); // -> parse content-type: application/x-www-form-urlencoded
app.use(methodOverride("_method"));
// app.use(flash());

//hand View engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.set("layout", "./admin/layout/default");

app.use("/api/v1", router);
// app.use("/admin", session, shareLocals, checkAuth, handleSidebar);
// app.use("/admin", adminRouter);

app.use(notFoundHandler);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
