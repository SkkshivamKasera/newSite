import fs from 'fs'
import { Course } from '../models/courseModel.js'
import cloudinary from 'cloudinary'
import { Note } from '../models/notesModel.js'

export const createCourse = async (req, res) => {
    try{
        const { name, desc, paid, price, CourseImage, docs_name } = req.body
        if(!name || !desc || !paid|| !CourseImage){
            return res.status(400).json({ success: false, message: "⚠️ All Fields Are Required" })
        }
        const myCloud = await cloudinary.v2.uploader.upload(CourseImage, {
            folder: "NotesImages",
            width: 150,
            crop: "scale"
        })
        const course = await Course.create({
            name, desc, paid, price, docs: {
                docs_name
            }, CourseImage: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        return res.status(200).json({success: true, message: "✅ Course Created"})
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const getAllCourse = async (req, res) => {
    try{
        const courses = await Course.find()
        return res.status(200).json({success: true, courses})
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const getCourseDetails = async (req, res) => {
    try{
        const { id } = req.params
        const course = await Course.findById(id)
        return res.status(200).json({success: true, course})
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const showPdf = async (req, res) => {
    try {
        const { name } = req.params
        console.log(name)
        res.setHeader('Content-Type', 'application/pdf');
        const filePath = `.\\backend\\actions\\notes\\${name}`;
        console.log(filePath)
        const data = fs.readFileSync(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Error reading the PDF file');
            } else {
                return data
            }
        });
        res.send(data)
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const createNote = async (req, res) => {
    try{
        const { name, img } = req.body
        if(!name || !img){
            return res.status(400).json({ success: false, message: "⚠️ All Fields Are Required" })
        }
        const myCloud = await cloudinary.v2.uploader.upload(img, {
            folder: "NotesImages",
            width: 150,
            crop: "scale"
        })
        await Note.create({
            name,  img: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        return res.status(200).json({success: true, message: "✅ Note Created"})
    } catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find()
        return res.status(200).json({success: true, notes})
    }catch (error) {
        return res.status(500).json({ success: false, message: `❌ ${error.message}` })
    }
}