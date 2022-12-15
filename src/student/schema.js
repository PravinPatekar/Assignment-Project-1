const { default: mongoose } = require("mongoose")

const Id = mongoose.Schema.Types.ObjectId


const studentModel = new mongoose.Schema({
    teacherId:{
        type:Id,
        required:true,
        ref:'teacher'
    },
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        enum:['Hindi','English','Maths','Science'],
        required:true
    },
    marks:{
        type:Number,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('student',studentModel)