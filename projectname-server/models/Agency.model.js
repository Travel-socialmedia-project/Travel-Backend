const { Schema, model } = require("mongoose");


const agentSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    website: {
      type: String,
      required: [true, "Website is required."],
    },
    description: {
        type: String,
      },
  },
  {
    
    timestamps: true,
  }
);

const Agency = model("Agency", agentSchema);

module.exports = Agency;
