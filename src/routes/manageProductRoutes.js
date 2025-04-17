const Router = require("koa-router");
const manageProductController = require("../controllers/manageProductController");
const createProductValidate = require("../middlewares/createProductValidate");

const router = new Router();
//end point for views ejs
router.get("/products", manageProductController.getProducts);

router.get("/add-product", manageProductController.showAddForm);
router.post("/add", manageProductController.createProduct);

router.get("/update/:id", manageProductController.showUpdateForm);
router.post("/update/:id", manageProductController.updateProduct);

router.get("/delete/:id", manageProductController.showDeleteForm);
router.post("/delete/:id", manageProductController.deleteProduct);

module.exports = router;
