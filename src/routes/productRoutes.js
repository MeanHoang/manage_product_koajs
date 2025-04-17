const Router = require("koa-router");
const productController = require("../controllers/productController");

const createProductValidate = require("../middlewares/createProductValidate");
const updateProductValidate = require("../middlewares/updateProductValidate");
const router = new Router({
  prefix: "/api/products",
});
//end point for api: http://localhost:4000/api/products

router.get("/ctx", productController.testContext);

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getDetailProduct);
router.post("/", createProductValidate, productController.createProduct);
router.put("/:id", updateProductValidate, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
