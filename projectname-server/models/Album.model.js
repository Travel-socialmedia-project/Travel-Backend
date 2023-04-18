const { Schema, model } = require("mongoose");


const albumSchema = new Schema(
  {
   country: {
      type: String,
      required: [true, "Country is required."],
    },
    city: {
        type: String,
      },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required." ],
    },
    description: {
        type: String,
      },
     
      user: { type: Schema.Types.ObjectId, ref: "User" },
      
      useraccess: [{type: Schema.Types.ObjectId, ref: "User", default: []}]
        
      },

   
  {
    
    timestamps: true,
  }, 
);

const Album = model("Album", albumSchema);

module.exports = Album;
