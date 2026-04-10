const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const db=require('./main');

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))

//create

app.post('/add',(req,res)=>{
    const{name,percentage,course}=req.body;
    db.query("insert into student1(name,percentage,course)values(?,?,?)",
        [name,percentage,course],(err,result)=>{
            if(err)
            {
                return res.send(err);
            }
            res.send("Inserted successfully");
        });

    });

    //read
    app.get('/read/:id',(req,res)=>{
        const id=req.params.id;
        db.query("select *from student1 where id=?",[id],(err,result)=>{
            if(err)
            {
                return res.send(err);
            }
            res.json(result);
        })
    })

    app.get('/student',(req,res)=>{
        db.query("select *from student1",(err,result)=>{
            if(err)
            {
                return res.send(err)
            }
            res.json(result);
        })
    })

    app.put('/update/:id',(req,res)=>{
        const id=req.params.id;
        const{name,percentage,course}=req.body;

        db.query("update student1 set name=?,percentage=?,course=? where id=?",
            [name,percentage,course,id],
            (err,result)=>{
                if(err)
                {
                    return res.send(err);

                }
                res.send("Updated successfully");
            })
    })

    //delete

    app.delete('/delete/:id',(req,res)=>{
        const id=req.params.id;
        db.query("delete from student1 where id=?",[id],(err,result)=>{
            if(err)
            {
                return res.send(err);

            }
            res.send("Deleted successfully");
        })
    })

    app.listen(3000,()=>{
        console.log("Server running on port 3000");
    })
