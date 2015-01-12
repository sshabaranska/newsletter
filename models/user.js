//====== user model ======
var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs'),
	Schema   = mongoose.Schema;

var schema = new Schema({
	local:{
		username: String,
		password: String,
		role: String
	}
});


// generate hash password
schema.methods.generateHash = function(password) { 
     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
}; 

// compare password
schema.methods.validPassword = function(password) { 
     return bcrypt.compareSync(password, this.local.password); 
}; 


// define model and access it
module.exports.User = mongoose.model('User', schema); // collection name is Users