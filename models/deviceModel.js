import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    label: { type: String, required: true },
    company :{type: String, required: true},
    ownerEmail: { type: String, required: true },
    groups: { type: String },
    topic: { type: String, required: false,unique : false},
    username: { type: String, required: true },
    password: { type: String, required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const Device = mongoose.model("Device", deviceSchema);

export default Device;
