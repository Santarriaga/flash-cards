const Collection = require("../models/Collection")
const Card = require("../models/Card")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors/index")

const createCollection = async (req, res) => {
  req.body.createdBy = req.user.userId
  const collection = await Collection.create(req.body)
  res.status(StatusCodes.CREATED).json(collection)
}

const getAllCollections = async (req, res) => {
  const userId = req.user.userId
  const collections = await Collection.find({ createdBy: userId }).sort(
    "createdAt"
  )
  res
    .status(StatusCodes.OK)
    .json({ count: collections.length, collections: collections })
}

const deleteCollection = async (req, res) => {
  const {
    user: { userId },
    params: { id: CollectionId },
  } = req

  //delete cards in collection
  const result = await Card.deleteMany({
    collectionGroup: CollectionId,
    createdBy: userId,
  })

  //delete collection
  const collection = await Collection.findByIdAndRemove({
    _id: CollectionId,
    createdBy: userId,
  })

  if (!collection) {
    throw new NotFoundError(`No collection with id ${CollectionId}`)
  }

  res.status(StatusCodes.OK).send("Removal Was Successful")
}

const getAllCardsInCollection = async (req, res) => {
  const user = req.user.userId
  const collectionId = req.params.id

  const cards = await Card.find({
    createdBy: user,
    collectionGroup: collectionId,
  })

  res.status(StatusCodes.OK).json({ count: cards.length, cards: cards })
}

const addCardToCollection = async (req, res) => {
  //add user id
  req.body.createdBy = req.user.userId

  collectionId = req.params.id
  //check if collection exist
  collection = await Collection.findById(collectionId)
  if (!collection) {
    throw new NotFoundError(`No collection with id ${Collection._id} was fond`)
  }
  //add collection id
  req.body.collectionGroup = collection._id

  //create card
  const card = await Card.create(req.body)

  res.status(200).json({ card })
}

module.exports = {
  getAllCollections,
  createCollection,
  deleteCollection,
  addCardToCollection,
  getAllCardsInCollection,
}
