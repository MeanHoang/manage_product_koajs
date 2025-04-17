const {
  getAll,
  create,
  getDetail,
  update,
  deletePro,
} = require("../repositorys/productRepository");

//Controller cho views
async function getProducts(ctx) {
  try {
    const { limit = 10, page = 1, sort = "asc" } = ctx.query;
    const { totalItem, totalPage, data } = await getAll(limit, page, sort);
    // console.log(">>> check gen faker: ", products);
    await ctx.render("page/manageProduct", {
      products: data,
      page: page,
      totalPage: totalPage,
      totalItem: totalItem,
      sort: sort,
      limit: limit,
    });
  } catch (error) {}
}

async function showAddForm(ctx) {
  await ctx.render("page/addProduct");
}
async function createProduct(ctx) {
  try {
    let data = ctx.request.body;
    const createdAt = new Date();
    data = { ...data, createdAt };
    console.log("check data add product: ", data);
    const newProduct = await create(data);

    if (!newProduct) {
      ctx.status = 400;
      await ctx.render("page/addProduct", { error: "Thêm sản phẩm thất bại!" });
      return;
    }

    ctx.redirect("/products");
  } catch (error) {}
}

async function showUpdateForm(ctx) {
  try {
    const id = ctx.params.id;
    const product = await getDetail(Number(id));

    // console.log("check product data: ", product);
    await ctx.render("page/updateProduct", {
      product: product,
    });
  } catch (error) {}
}
async function updateProduct(ctx) {
  try {
    const id = ctx.params.id;
    let dataUpdate = ctx.request.body;
    // console.log("check data add product: ", data);
    const updateProduct = await update(id, dataUpdate);

    if (!updateProduct) {
      ctx.status = 400;
      await ctx.render("products", { error: "Thêm sản phẩm thất bại!" });
      return;
    }

    ctx.redirect("/products");
  } catch (error) {}
}

async function showDeleteForm(ctx) {
  try {
    const id = ctx.params.id;
    const product = await getDetail(Number(id));

    // console.log("check product data: ", product);
    await ctx.render("page/deleteProduct", {
      product: product,
    });
  } catch (error) {}
}
async function deleteProduct(ctx) {
  try {
    const id = ctx.params.id;
    // console.log("check data add product: ", data);
    const deleteStatus = await deletePro(id);

    if (!deleteStatus) {
      ctx.status = 400;
      await ctx.render("products", { error: "Xóa sản phẩm thất bại!" });
      return;
    }

    ctx.redirect("/products");
  } catch (error) {}
}

module.exports = {
  getProducts,
  showAddForm,
  createProduct,
  showUpdateForm,
  updateProduct,
  showDeleteForm,
  deleteProduct,
};
