const yup = require("yup");

async function createProductValidate(ctx, next) {
  try {
    const dataAdd = ctx.request.body;

    console.log(">>> check req.body:", ctx.request.body);
    let schema = yup.object().shape({
      image: yup.string().default("no image"),
      createdAt: yup
        .date()
        .default(() => new Date())
        .required(),
      color: yup.string().default("no color"),
      product: yup.string().default("no product"),
      description: yup.string().default("no desc"),
      price: yup.number().default(10).min(10).max(1000),
      name: yup.string().required(),
    });

    const finalData = await schema.cast(dataAdd);
    console.log("check final data: ", finalData);
    await schema.validate(finalData);

    ctx.state.finalData = finalData;

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

module.exports = createProductValidate;
