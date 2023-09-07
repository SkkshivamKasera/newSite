import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    CourseImage: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type:String,
            required:true
        }
    },
    paid: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    docs: {
        docs_name: {
            type: String,
            default: null
        }
    },
    enrollments: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            enrollment_date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

export const Course = mongoose.model("courses", courseSchema)