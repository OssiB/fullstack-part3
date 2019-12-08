const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('useFindAndModify', false)

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const contactSchema = new mongoose.Schema({
  name:{ type: String, required: true, unique: true , minlength: 3},
  number: {type:String, minlength: 5}

})


contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  } 
})
contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Contact', contactSchema)