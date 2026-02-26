const express = require('express');
const app = express();
const port = 8000;

const student = [
    { id: 1, name: "Deepak", class: "B.Tech" },
    { id: 2, name: "Rahul", class: "BCA" },
    { id: 3, name: "Aman", class: "MCA" }
];

app.get('/', (req, res)=>{
    res.send(`
        <html>
        <head>
            <title>Home</title>
        </head>
        <body>
            <h1>ABES Engineering College</h1>
            <img src="https://www.abes.ac.in/assets/2.jpg" width="500">
            <br><br>
            <a href="/work">
                <button>Go to Work Page</button>
            </a>
        </body>
        </html>
    `);
});


app.get('/work', (req, res)=>{
    let data = student.map(s => `
        <li>ID: ${s.id} | Name: ${s.name} | Class: ${s.class}</li>
    `).join("");
    res.send(`
        <html>
        <head>
            <title>Work</title>
        </head>
        <body>

            <h1>Student JSON Data</h1>

            <ul>
                ${data}
            </ul>

            <br>

            <a href="/">
                <button>Go to Home Page</button>
            </a>

        </body>
        </html>
    `);

});

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});