const mongoose = require('mongoose')

const url = process.env.MONGODB_URI 

console.log('connecting to', url)  

mongoose.set('useFindAndModify', false)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
  const contactSchema = new mongoose.Schema({
    name: String,
    number: String
    
  })
  
  const Contact = mongoose.model('Contact', contactSchema)
  
  
  contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  module.exports = mongoose.model('Contact', contactSchema)