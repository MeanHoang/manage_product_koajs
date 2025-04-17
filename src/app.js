const Koa = require("koa");
const render = require("koa-ejs");
const path = require("path");
const koaBody = require("koa-body");
const productRoutes = require("./routes/productRoutes");
const manageProductRoutes = require("./routes/manageProductRoutes");

const app = new Koa();

app.use(
  koaBody({
    multipart: true, //cho phép upload file
    urlencoded: true,
    json: true,
    formidable: {
      uploadDir: "./uploads", //thư mục lưu file upload
      keepExtensions: true, //giữ lại phần đuôi
    },
  })
);

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout/template",
  viewExt: "ejs",
  cache: false,
  // debug: true,
});

app.use(productRoutes.routes());
app.use(productRoutes.allowedMethods());

app.use(manageProductRoutes.routes());
app.use(manageProductRoutes.allowedMethods());

app.listen(4000);
