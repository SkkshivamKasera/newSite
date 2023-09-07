import express from 'express'
import User from './routers/userRouter.js'
import Course from './routers/courseRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import expressFileupload from 'express-fileupload'
import path from 'path'

export const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(expressFileupload())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use("/api/v1", User)
app.use("/api/v1", Course)
app.use(express.static(path.resolve("./frontend/build")))

app.get("*", (req, res) => {
    app.use(express.static(path.resolve("./frontend/build")))
})