const express= require("express");
const app=express();
const morgan=require("morgan");
const port=3500
const dbconnect = require("./config/conexion");
//const comidaRouter= require('./routes/comidaRouter')

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(morgan('dev'))
//app.use('/Api', comidaRouter)




app.get("/", (req,res)=>{
    res.json({mensage:"Welcome to my server"})
}
)

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


dbconnect();