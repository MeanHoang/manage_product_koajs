const yup = require("yup");

async function updateProductValidate(ctx, next) {
  try {
    const dataUpdate = ctx.request.body;

    let schema = yup.object().shape({
      price: yup.number().min(10).max(1000),
    });

    await schema.validate(dataUpdate);

    ctx.state.dataUpdate = dataUpdate;

    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      status: "fail",
      message: "Check infor product!",
      error: e.errors,
    };
  }
}

module.exports = updateProductValidate;
