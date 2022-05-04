const mongoose=require('mongoose')

const UserModelSchema=mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,'please add a name']
        },
        email: {
            type: String,
            required: [true,'please add an email address'],
            unique: true
        },
        password: {
            type: String,
            required: [true,'please add a password']
        }
    },
    {
        timestamps: true,
    }
);



module.exports=mongoose.model('User',UserModelSchema);
