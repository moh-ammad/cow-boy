import express from "express";
import dotenv from "dotenv";
import ConnectToDb from "./connection/db.js";
import rvmRoutes from "./routes/payload.js";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
ConnectToDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/rvm", rvmRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

