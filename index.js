import axios from "axios";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 7777;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { username: "guest" });
});

app.get("/products", async (req, res) => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products");
    res.render("products", { list: data.products });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get("https://dummyjson.com/products/" + id);
    res.render("product", { item: data });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// __filename: C:\Users\adilz\OneDrive\Рабочий стол\Alpha Edu\Backend\Projects\ejs-learn-project\index.js -->
// __dirname: C:\Users\adilz\OneDrive\Рабочий стол\Alpha Edu\Backend\Projects\ejs-learn-project\public\ -->
// path.join(__dirname, "public")
