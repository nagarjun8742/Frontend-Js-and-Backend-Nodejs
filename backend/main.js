var express=require("express")
var mysql=require("mysql2")
var app=express()
app.use(express.json())


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Muthu@2003',
    database:'student1'
})

db.connect((err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("connected")
    }
})

module.exports=db;


