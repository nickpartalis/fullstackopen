const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Must have a title'] },
  author: { type: String, default: 'anonymous'},
  url: { type: String, required: [true, 'Must have an url'] },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)