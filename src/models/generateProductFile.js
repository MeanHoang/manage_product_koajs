const fs = require("fs");
const { faker } = require("@faker-js/faker");

// Tạo dữ liệu
const generateProducts = (limit = 1000) => {
  const products = [];

  for (let i = 1; i <= limit; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 10, max: 1000 }),
      description: faker.commerce.productDescription(),
      product: faker.commerce.product(),
      color: faker.color.human(),
      createdAt: faker.date.past().toISOString(),
      image: faker.image.urlLoremFlickr({
        width: 640,
        height: 480,
        category: "product",
      }),
    });
  }

  return products;
};

const products = generateProducts(1000);

// Ghi vào file
fs.writeFile(
  "product.json",
  JSON.stringify({ data: products }, null, 2),
  (err) => {
    if (err) {
      console.error("Lỗi khi ghi file:", err);
    } else {
      console.log("Đã tạo file product.json thành công!");
    }
  }
);
