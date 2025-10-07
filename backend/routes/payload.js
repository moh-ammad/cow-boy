import { Router } from "express";
import axios from "axios";
import RvmPayload from "../models/RvmPayload.js"; // your model
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/", async (req, res) => {
  const payload = req.body;

  try {
    // 1. Save to MongoDB
    const saved = await RvmPayload.create(payload);

    // 2. Forward payload to DropCowboy API
    const cowboyResponse = await axios.post(process.env.COWBOY_API_URL, payload, {
      headers: {
        "Content-Type": "application/json"
        // Add Authorization headers here if DropCowboy requires it
      }
    });

    console.log("✅ Payload forwarded to DropCowboy");

    // 3. Send response back to client
    res.status(201).json({
      message: "Payload saved and forwarded",
      data: saved,
      cowboyResponse: cowboyResponse.data,
    });

  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
