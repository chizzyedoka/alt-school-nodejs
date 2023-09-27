const mongoose = require("mongoose");
// const { or } = "./models";
// mongoose
//   .connect("mongodb://0.0.0.0:27017/invent-management-system", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));

// ENTITIES/COLLECTION CREATION
db.createCollection("CUSTOMERS");
db.createCollection("PRODUCTS");
db.createCollection("ORDERS");
db.createCollection("CATEGORY");
db.createCollection("SIZES");

// INSERTING RECORDS
db.CUSTOMERS.insertOne({
  name: "Chizzy",
  email: "chizzy@gmail.com",
  address: "123 akoka",
  phoneNumber: "+234 5678",
});

db.PRODUCTS.insertOne({
  productName: "Pampers",
  size: "medium",
  category_id: 2,
  quantity: 4,
  price: 500,
});

db.ORDERS.insertOne({
  customerName: "Chizzy",
  products: [id_1, id_2],
  quantity: 1,
  price: 1000,
});

// GETTING RECORDS
db.CUSTOMERS.findOne({ name: "Chizzy" }); //returns one user with name Chizzy
db.PRODUCTS.findOne({ productName: "Pampers" });

// UPDATING RECORDS
db.CUSTOMERS.updateOne({ name: "Chizzy" }, { $set: { name: "Chisom" } }); //updates one user"s address:moon, where _id: 1
db.PRODUCTS.updateOne(
  { productName: "Pampers" },
  { $set: { productName: "Peak Milk" } }
); //updates one admin token where _id:1
db.PRODUCTS.updateMany({ size: "medium" }, { $set: { size: "big" } }); //update all product with size:medium to size:big

// DELETING RECORDS
db.CUSTOMERS.deleteOne({ name: "Chisom" });
db.PRODUCT.deleteMany({ size: "big" }); //delete all product with the size:big
