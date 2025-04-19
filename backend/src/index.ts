import express, {Request, Response} from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", function(req: Request, res: Response){
    res.send("working")  
})

app.listen(3000, () => console.log("Server running on port 3000"));