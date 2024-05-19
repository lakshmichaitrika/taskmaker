const express=require("express");
const mongoose=require("mongoose");
const TaskSchema=require("./model");
mongoose.connect("mongodb+srv://lakshmichaitrika2002:task@task.oaofvss.mongodb.net/?retryWrites=true&w=majority&appName=task")
.then(()=>{
    console.log("db connected")
})
.catch(err=>{
    console.log(err)
})
const app=express()
app.use(express.json())
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