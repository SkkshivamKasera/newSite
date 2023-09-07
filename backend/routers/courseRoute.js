import express from 'express'
import { createCourse, getAllCourse, getCourseDetails, showPdf, getAllNotes, createNote } from '../actions/courseAction.js'
import { isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post("/admin/new", isAdmin, createCourse)
router.get("/getAllCourse", getAllCourse)
router.get("/course/:id", getCourseDetails)
router.post("/admin/note/new", isAdmin, createNote)
router.get("/getAllNotes", getAllNotes)
router.get("/notes/:name", showPdf)

export default router