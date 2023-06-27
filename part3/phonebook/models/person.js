const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(res => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
