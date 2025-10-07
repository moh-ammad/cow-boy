import mongoose from "mongoose";

const { Schema, model } = mongoose;

const payloadSchema = new Schema({
  team_id: { type: String, required: true },
  secret: { type: String, required: true },
  brand_id: { type: String, required: true },
  recording_id: { type: String, required: true },
  phone_number: { type: String, required: true },
  forwarding_number: { type: String, required: true },
  foreign_id: { type: String, required: true },
}, { timestamps: true }); // auto adds createdAt and updatedAt

const RvmPayload =model("RvmPayload", payloadSchema);

export default RvmPayload;
