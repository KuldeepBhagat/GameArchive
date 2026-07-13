import express, { type Request, type Response} from "express";
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();
const app = express();
const  port = 5000;
const mongoURI = "mongodb+srv://kuldeep496242_db_user:Xzt5yAR06bbhFpk0@cluster0.n8pjrkl.mongodb.net/?appName=Cluster0"

app.use(cors());
app.use(express.json());

async function testMongo() {
    try {
        console.log("trying to connect")
        await mongoose.connect(mongoURI)
        console.log("connected successfully")
    } catch (err) {
        console.error("failed", err)
    } finally {
        await mongoose.connection.close();
    }
}

app.post("/api/test", (req: Request, res: Response) => {
    console.log("backend connected")
    const {username, email, password } = req.body;
    console.log(username, email, password)
    testMongo();
    res.json({data: "success"})
})

app.listen(port, () => {
    console.log("connected to PORT:", port);
})