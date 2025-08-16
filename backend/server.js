import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectCloudinay from './config/cloudinary.js'
import connectDB from './config/connectionDB.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
connectDB()
connectCloudinay()


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World!!")
})

app.listen(PORT, ()=> {
 
    console.log("Server started on PORT", PORT)
})