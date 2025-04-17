const {
  getAll,
  getDetail,
  create,
  update,
  deletePro,
} = require("../repositorys/productRepository");
//controller cho api
async function testContext(ctx) {
  //path vs url thi dau co khac gi dau
  const path = ctx.path;
  const url = ctx.url;
  const hostname = ctx.host;
  const protocol = ctx.protocol;
  const clientIP = ctx.ip;

  ctx.body = {
    path: path,
    url: url,
    hostname: hostname,
    protocol: protocol,
    clientIP: clientIP,
  };
}
async function getAllProduct(ctx) {
  try {
    const { limit = 10, page = 1, sort = "asc" } = ctx.query;
    const { totalItem, totalPage, data } = await getAll(limit, page, sort);
    // console.log(">>> check gen faker: ", products);
    ctx.status = 200;

    ctx.body = {
      totalItem: totalItem,
      totalPage: totalPage,
      page: page,
      data: data,
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      status: false,
      data: [],
      error: error.message,
    };
  }
}

async function getDetailProduct(ctx) {
  try {
    const id = ctx.params.id;

    const fields = ctx.query.fields;
    // console.log("check fields: ", fields);
    let arrFields = [];
    if (fields) {
      arrFields = fields.split(",");
    }

    // console.log("check arr fields: ", arrFields);

    const product = await getDetail(id, arrFields);

    if (product == undefined) {
      ctx.status = 404;
      ctx.body = {
        meserrsage: "Not found product!",
      };
      return;
    }
    ctx.body = product;
  } catch (error) {
    console.error("Error getting product details:", error);
    ctx.status = 500;
    ctx.body = { error: "An error occurred while fetching the product" };
  }
}

async function createProduct(ctx) {
  try {
    const data = ctx.state.finalData;

    const newProduct = await create(data);
    console.log("check new product: ", newProduct);
    if (!newProduct) {
      ctx.status = 404;
      ctx.body = {
        message: "Add new product fail!",
      };
      return;
    }

    ctx.status = 201;
    ctx.body = { message: "Add new product success!", newProduct: newProduct };
  } catch (error) {}
}

async function updateProduct(ctx) {
  try {
    const id = ctx.params.id;
    const dataUpdate = ctx.state.dataUpdate;

    const updateProduct = await update(id, dataUpdate);

    if (updateProduct == undefined) {
      ctx.status = 404;
      ctx.bosy = {
        message: "Not found product!",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "Update product success!",
      product: updateProduct,
    };
  } catch (error) {}
}

async function deleteProduct(ctx) {
  try {
    const id = ctx.params.id;

    const statusDelete = await deletePro(id);
    // console.log(">>>check status Delete: ", statusDelete);
    if (statusDelete == undefined || statusDelete == false) {
      ctx.status = 404;
      ctx.bosy = {
        message: "Not found product!",
      };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      message: "Delete product success!",
      productId: id,
    };
  } catch (error) {}
}

module.exports = {
  testContext,
  getAllProduct,
  getDetailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
