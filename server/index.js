const express=require("express");
const mongoose=require("mongoose");
const TaskSchema=require("./model");
const cors=require("cors")
const dotenv=require("dotenv");
const path=require("path");
__dirname=path.resolve();
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("db connected")
})
.catch(err=>{
    console.log(err)
})
const app=express()
app.use(express.json())
app.use(express.static(path.join(__dirname,'/client/dist')))
app.use(cors({
    origin:"*"
}))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.listen("5000",()=>{
    console.log("server is running at 5000")
})
app.get("/",(req,res)=>{
    res.json("hello");
})

app.post("/addtask",async(req,res)=>{
    const {todo}=req.body;
    try{
        const newTask=new TaskSchema({todo});
        await newTask.save()
        return res.json(await TaskSchema.find())

    }
    catch(e){
     console.log(e)
    }
})

app.get("/gettask",async(req,res)=>{
    try{
      return res.json(await TaskSchema.find())
    }
    catch(err){
    console.log(err)
    }
    })

app.delete("/delete/:id",async(req,res)=>{
        const task=req.params.id;
        await TaskSchema.findByIdAndDelete(task)
        res.json(await TaskSchema.find())
        })