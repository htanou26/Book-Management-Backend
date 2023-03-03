const mongoose=require("mongoose")
const categoryShcema =new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name:{
            type:String,
            required: [true, "Please add a name"],
            trim: true
        },
        description:{
            type:String,
            required: [true, "Please add a description"],
            trim: true
        }
    },
    {
        timestamps: true,
    }
)
const Category=mongoose.model("Category", categoryShcema)
module.exports=Category