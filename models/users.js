var mongoose=require('./connections')


var usersSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

module.exports = mongoose.model("users", usersSchema)