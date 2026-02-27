
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const PlayerSchema = new mongoose.Schema({
nickname:String,
role:String
});

const Player = mongoose.model("Player", PlayerSchema);

const roles = ["Студент","Студент","Студент","Предатель"];

app.post("/join", async(req,res)=>{
const {nickname, rolePref} = req.body;

let role;
if(rolePref==="random"){
const randomIndex=Math.floor(Math.random()*roles.length);
role=roles[randomIndex];
}else{
role=rolePref==="student"?"Студент":"Предатель";
}

const player=new Player({nickname, role});
await player.save();

res.json({success:true});
});

app.get("/players", async(req,res)=>{
const players=await Player.find();
res.json(players);
});

app.post("/reset", async(req,res)=>{
await Player.deleteMany({});
res.json({reset:true});
});

app.listen(process.env.PORT||3000,()=>console.log("Server running"));
