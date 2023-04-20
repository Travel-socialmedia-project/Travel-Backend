const { Schema, model } = require("mongoose");


const agencySchema = new Schema(
  {
    name:{
      type: String,
      required: [true, "Agency is required."],

    },
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
    phonenumber: {
        type: String,
      },

    collections: [{ type: Schema.Types.ObjectId, ref: "Album" }],
      
      logo: {
    type: String, }
  },
 
    

  {
    
    timestamps: true,
  }
);

const Agency = model("Agency", agencySchema);

module.exports = Agency;
