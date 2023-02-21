const mongoose = require("mongoose")

const CardSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please provide a question"],
      maxLength: 250,
    },
    answer: {
      type: String,
      required: [true, "Please provide an awswer "],
      maxLength: 250,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide a user"],
    },
    collectionGroup: {
      type: mongoose.Types.ObjectId,
      ref: "Collection",
      require: [true, "Please provide a collection group"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Card", CardSchema)
