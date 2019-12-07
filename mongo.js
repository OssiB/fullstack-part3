const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give a password at least as  argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://puhelin_3b:${password}@cluster0-meam4.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
console.log(url)
mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String

})

const Contact = mongoose.model('Contact', contactSchema)


if (process.argv.length == 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const contact = new Contact({
    name: name,
    number: number
  })
  contact.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}
