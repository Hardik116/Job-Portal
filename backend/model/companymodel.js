const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const companyschema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{timestamps:true})

companyschema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields are required");
    }

    const company = await this.findOne({ email });
    if (!company) {
        throw Error("Invalid email");
    }

    const match = await bcrypt.compare(password, company.password);
    if (!match) {
        throw Error("Invalid password");
    }
    return company;
};


companyschema.statics.signup = async function( name,email, password){
    if(!name || !email || !password){
        throw Error("All feilds are required")
    }
    if(!validator.isEmail(email)){
        throw Error("Invalid Email id")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }

    const exists = await this.findOne({ email });
    if (exists) throw Error('Email already registered');

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt)

    const company = this.create({ name ,email, password: hashedpassword});
    return company;
}


const Company = mongoose.model('Company', companyschema);

module.exports = Company;