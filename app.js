import "dotenv/config";
import express from "express";
import cors from "cors";
import "./database/connection.js";
import Product from "./database/products.js";

const app = express();

app.use(express.json());
app.use(cors());

const defaultErrorMessage = 'ocorreu um erro interno, arruma o bglh ai tio.'

// Create
app.post("/products", async (request, response) => {
  const { name, price, description } = request.body;

  if (!name || !description || typeof price !== "number") {
    return response.status(400).json({ message: "Invalid request body" });
  }

  const newProduct = new Product({
    name,
    description,
    price,
  });

  await newProduct.save();

  response.status(201).json({ newProduct });
});

// Read
app.get("/products", async (request, response) => {
  const products = await Product.find();
  response.status(200).json({ products: products });
});

app.get("/products/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const productFounded = await Product.findById(id);

    if (!productFounded) {
      return response.status(404).json({ message: "Product not found" });
    }

    response.status(200).json({ product: productFounded });

  } catch (error) {
    response.status(500).json({
      message: error.message || "internal server error",
      errorOcurred: error
    });
  }



});

// Update
app.put("/products/:id", async (request, response) => {
  const { id } = request.params
  const productUpdated = await Product.findByIdAndUpdate(
    id,
    request.body,
    { new: true }
  )

  response.status(200).json({ product: productUpdated })
});

// Delete
app.delete("/products/:id", async (request, response) => { 
  try {
    await Product.deleteOne({ _id: request.params.id })
    response.status(204).end();
  }catch (error) {
    response.status(500).json({
      message: error.message || defaultErrorMessage
    })
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));
