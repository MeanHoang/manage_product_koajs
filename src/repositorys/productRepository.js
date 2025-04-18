const { data: products } = require("../models/product.json");
const path = require("path");
const productsFilePath = path.join(__dirname, "../models/product.json");
const fs = require("fs");

const getAll = async (limit = 10, page = 1, sort) => {
  try {
    const data = [...products];

    // console.log(">>>check data product: ", data);
    //Sap xep phan tu
    console.log(sort);
    if (sort != undefined) {
      data.sort((a, b) => {
        if (sort === "asc")
          return new Date(a.createdAt) - new Date(b.createdAt);
        if (sort === "desc")
          return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
    }
    //Phan trang
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = data.slice(startIndex, endIndex);

    //Tinh tong so trang , ban ghi
    const totalItem = data.length;
    const totalPage = Math.ceil(totalItem / limit);

    return {
      totalItem,
      totalPage,
      data: paginatedData,
    };
  } catch (error) {}
};

const getDetail = async (id, arrFields = []) => {
  try {
    const data = products;

    // console.log("check data: ", data);
    const product = data.find((item) => item.id === Number(id));
    // console.log(">>>check product: ", product);
    // console.log("check dirname: ", __dirname);

    if (arrFields.length === 0) {
      return product;
    }

    let filterProduct = {};
    arrFields.forEach((field) => {
      filterProduct[field] = product[field];
    });

    return filterProduct;
  } catch (error) {
    console.log(">>>error: Not find any product have id: ", id);
    console.log(error);
  }
};

const create = async (dataAdd) => {
  try {
    const data = products;
    const newId = Math.max(...data.map((p) => p.id)) + 1;
    const newProduct = { id: newId, ...dataAdd };
    data.push(newProduct);

    // Ghi lại dữ liệu vào file
    fs.writeFileSync(productsFilePath, JSON.stringify({ data: data }, null, 2));
    // console.log("check dirname: ", __dirname);
    console.log("check new product: ", newProduct);

    return newProduct;
  } catch (error) {
    console.error("Error while creating product:", error);
  }
};

const update = async (id, dataUpdate) => {
  try {
    let data = products;

    const index = products.findIndex((p) => p.id === Number(id));

    if (index === -1) {
      return null;
    }

    data[index] = {
      ...data[index],
      id: data[index].id,
      ...dataUpdate,
    };

    fs.writeFileSync(productsFilePath, JSON.stringify({ data: data }, null, 2));
    return data[index];
  } catch (error) {
    console.error("Error while updating product:", error);
    return null;
  }
};

const deletePro = async (id) => {
  try {
    let data = products;

    const index = products.findIndex((p) => p.id === Number(id));

    if (index === -1) {
      return null;
    }

    data.splice(index, 1); //xoa 1 phan tu

    fs.writeFileSync(productsFilePath, JSON.stringify({ data: data }, null, 2));
    return true;
  } catch (error) {
    console.error("Error while updating product:", error);
    return false;
  }
};

module.exports = {
  getAll,
  getDetail,
  create,
  update,
  deletePro,
};
