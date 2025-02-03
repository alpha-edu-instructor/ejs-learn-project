// import axios from "axios";
import express from "express";
import { posts } from "./data/posts.js";

const app = express();
const PORT = 7777;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { username: "Адиль" });
});

app.get("/products",  (req, res) => {
  res.render("products", { list: posts });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const post = posts[id - 1];
  res.render("product", { data: post });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
