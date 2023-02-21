const { StatusCodes } = require("http-status-codes")
const Card = require("../models/Card")

const updateCard = async (req, res) => {
  const {
    body: { question, answer },
    user: { userId },
    params: { id: cardId },
  } = req

  if (question === "" || answer === "") {
    throw new BadRequestError("Question or answer fields cannot be empty")
  }

  const card = await Card.findByIdAndUpdate(
    { _id: cardId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )

  if (!card) {
    throw new NotFoundError(`No job with id ${cardId}`)
  }

  res.status(StatusCodes.OK).json({ card })
}

const deleteCard = async (req, res) => {
  const {
    user: { userId },
    params: { id: cardId },
  } = req

  const card = await Card.findByIdAndRemove({
    _id: cardId,
    createdBy: userId,
  })

  if (!card) {
    throw new NotFoundError(`No card with id ${cardId} was found`)
  }

  res.status(StatusCodes.OK).send()
}

module.exports = {
  updateCard,
  deleteCard,
}
