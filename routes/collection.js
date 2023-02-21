const express = require("express")
const router = express.Router()
const {
  getAllCollections,
  createCollection,
  deleteCollection,
  getAllCardsInCollection,
  addCardToCollection,
} = require("../controllers/collections")

router.route("/").get(getAllCollections).post(createCollection)
router.route("/:id").delete(deleteCollection)
router
  .route("/:id/cards")
  .get(getAllCardsInCollection)
  .post(addCardToCollection)

module.exports = router
