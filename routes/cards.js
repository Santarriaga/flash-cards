const express = require("express")
const router = express.Router()
const { updateCard, deleteCard } = require("../controllers/cards")

router.route("/:id").patch(updateCard).delete(deleteCard)

module.exports = router
