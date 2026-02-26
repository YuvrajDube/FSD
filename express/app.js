const express = require('express');
const app=express();
const port=8000;

const student =[{
    id:1,
    name:"deepak",
    class:"B.Tech"
}]

app.get('/json', (req, res)=>{
    res.json(student);
})

app.get('/', (req, res)=>{
    res.send ("<h1>This is my first server</h1>");
})

app.get('/about', (req, res)=>{
    res.send ("<h1>This is my about us page</h1>");
})

app.get('/img', (req, res)=>{
    res.send (`<h1>This is the image of Cartoon</h1>
        <img src="https://media.istockphoto.com/id/1681388313/vector/cute-baby-panda-cartoon-on-white-background.jpg?s=612x612&w=0&k=20&c=qFrzn8TqONiSfwevvkYhys1z80NAmDfw3o-HRdwX0d8=">`);
})

app.listen(port,()=>(
    console.log(`server is run at :http://localhost:${port}`)
))