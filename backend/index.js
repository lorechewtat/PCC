
const express=require("express");
const MongoClient=require("mongodb").MongoClient;
var cors=require("cors");
const bodyParser=require("body-parser");
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
const fs=require("fs");
const https = require('https');

const app=express();
app.use(cors());
const PORT=3000;
let db;
app.use(bodyParser.json());

//createOne
app.post("/reportes", async (req,res)=>{
	let valores=req.body
	// valores["id"]=Number(valores["id"])
	let data=await db.collection("reportes").insertOne(valores);
	res.json(data)
});


async function connectToDB(){
	let client=new MongoClient(await process.env.DB);
	await client.connect();
	db=client.db();
	console.log("conectado a la base de datos");
}

/*async function connectToDB(){
	let client=new MongoClient("mongodb://127.0.0.1:27017/PCC");
	await client.connect();
	db=client.db();
	console.log("conectado a la base de datos");
}*/

const options = {
      key: fs.readFileSync('backend.key'),
      cert: fs.readFileSync('backend.crt')
    };

https.createServer(options, app).listen(3000, async () => {
		await process.loadEnvFile(".env");
		connectToDB();
      	console.log('HTTPS Server running on port 3000');
});


