import { Course } from "../models/courseModel.js"
import { User } from "../models/userModel.js"
import { sendToken } from "../utils/sendToken.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "⚠️ All Fields Are Required" })
        }
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "❌ User Already Exists" })
        }
        user = await User.create({
            name, email, password
        })
        await sendToken(user, true, "✅ Sign Up Successfully", res)
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "⚠️ All Fields Are Required" })
        }
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({ success: false, message: "❌ Invalid Email or Password" })
        }
        const isMatched = await user.comparePassword(password)
        if (!isMatched) {
            return res.status(400).json({ success: false, message: "❌ Invalid Email or Password" })
        }
        await sendToken(user, true, "✅ Login Successfully", res)
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const logout = async (req, res) => {
    try {
        await sendToken(null, false, "✅ Logout Successfully", res)
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const loadUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({ success: true, user })
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const enroll = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { id } = req.params
        const course = await Course.findById(id)
        if(!course){
            return res.status(400).json({ success: false, message: "❌ Course Not Found" });
        }
        const isEnrolled = course.enrollments.some(enrollment => enrollment.user_id.toString() === user._id.toString());
        if (isEnrolled) {
            return res.status(400).json({ success: false, message: "⚠️ Already Enrolled" });
        }
        course.enrollments.push({
            user_id: user._id
        });
        await course.save();
        return res.status(200).json({ success: true, message: "✅ Enrolled Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const removeEnroll = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { id } = req.params
        const course = await Course.findById(id)
        if(!course){
            return res.status(400).json({ success: false, message: "❌ Course Not Found" });
        }
        const isEnrolled = course.enrollments.some(enrollment => enrollment.user_id.toString() === user._id.toString());
        if (!isEnrolled) {
            return res.status(400).json({ success: false, message: "⚠️ Not Enrolled" });
        }
        course.enrollments = course.enrollments.filter((enrollment) => enrollment.user_id.toString() !== user._id.toString())
        await course.save();
        return res.status(200).json({ success: true, message: "✅ Removed Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}