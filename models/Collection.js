const mongoose = require("mongoose")

const CollectionSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: [true, "Please Provide a name for the collection"],
      maxLength: 50,
      minLenght: 1,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Collection", CollectionSchema)
