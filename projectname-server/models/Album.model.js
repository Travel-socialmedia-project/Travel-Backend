const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
      userAccess: [{type: Schema.Types.ObjectId, ref: "User"}]
        
      },
    //   owner: {
    //     type:String,

    //  }, 

  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }, 
);

const Album = model("Album", albumSchema);

module.exports = Album;
