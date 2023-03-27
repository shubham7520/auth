import Express from "express";
import { config } from "dotenv";
import connectDb from "./config/connectDb.js";
import userRoute from "./routes/userRoute.js"

const app = Express();
config()
connectDb()
app.use(Express.json());


app.get("/", (req, res) => {
    res.status(200).json({ message: "API is working" })
})

app.use('/api/v1', userRoute);


const port = process.env.PORT
app.listen(port, console.log(`Server start on port ${port}...`));