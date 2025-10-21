const express=require("express");
const MongoClient=require("mongodb").MongoClient;
var cors=require("cors");
const bodyParser=require("body-parser");
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
const fs=require("fs");
const https = require('https');

const app = express();
app.use(cors());
const PORT = 3000;
let db;
app.use(bodyParser.json());

// Funcion debugueo para ver las solicitudes que llegan al backend
app.use((req, _res, next) => {
  console.log(">>", req.method, req.originalUrl);
  next();
});

async function log(sujeto, objeto, accion) {
  toLog = {};
  toLog["timestamp"] = new Date();
  toLog["sujeto"] = sujeto;
  toLog["objeto"] = objeto;
  toLog["accion"] = accion;
  await db.collection("log402").insertOne(toLog);
}

app.get("/reportes", async (req, res) => {
  try {
    //let token = req.get("Authentication");
    //let verifiedToken = await jwt.verify(token, "TC2007BDabeca");
    //let user = verifiedToken.usuario;
    if ("_sort" in req.query) {
      //getList
      console.log("🔍 Query params:", req.query);
      console.log(
        "📊 inicio:",
        Number(req.query._start),
        "fin:",
        Number(req.query._end),
      );
      let sortBy = req.query._sort;
      let sortOrder = req.query._order == "ASC" ? 1 : -1;

      let inicio = Number(req.query._start) || 0;
      let fin = Number(req.query._end);
      if (isNaN(fin)) {
        fin = undefined;
      }

      console.log("📊 inicio:", inicio, "fin:", fin);

      let sorter = {};
      sorter[sortBy] = sortOrder;

      let data = await db
        .collection("FRAP")
        .find({})
        .sort(sorter)
        .project({ _id: 0 })
        .toArray();
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", data.length);
      if (fin !== undefined) {
        data = data.slice(inicio, fin);
      }
      //log(user, "reportes", "leer");
      res.json(data);
    } else if ("id" in req.query) {
      let data = [];
      const ids = Array.isArray(req.query.id) ? req.query.id : [req.query.id];
      for (let index = 0; index < ids.length; index++) {
        let dataParcial = await db
          .collection("FRAP")
          .find({ id: Number(ids[index]) })
          .project({ _id: 0 })
          .toArray();
        data = data.concat(dataParcial);
      }
      res.json(data);
    } else {
      let data = await db
        .collection("FRAP")
        .find(req.query)
        .project({ _id: 0 })
        .toArray();
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", data.length);
      res.json(data);
    }
  } catch {
    res.sendStatus(401);
  }
});

//getOne reportes
app.get("/reportes/:nombre", async (req,res)=>{
  try {
    const nombre = decodeURIComponent(req.params.nombre);
    let data = await db.collection("FRAP").find({
      "datosPaciente.nombre": nombre
    }).project({_id:0}).toArray();
    res.json(data[0]);
  } catch (error) {
    console.error("Error searching by nombre:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Search by socorrista name
app.get("/reportes/socorrista/:socorrista", async (req, res) => {
  try {
    const socorrista = decodeURIComponent(req.params.socorrista);
    let data = await db.collection("FRAP").find({
      "datosLugarControl.socorrista": socorrista
    }).project({ _id: 0 }).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error searching by socorrista:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Search by date
app.get("/reportes/fecha/:fecha", async (req, res) => {
  try {
    const fecha = req.params.fecha;
    let data = await db.collection("FRAP").find({
      "datosCronometria.fecha": fecha
    }).project({ _id: 0 }).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error searching by fecha:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Combined search endpoint for nombre, socorrista, and fecha
app.get("/reportes/search", async (req, res) => {
  try {
    const { nombre, socorrista, fecha } = req.query;
    let query = {};
    
    if (nombre) {
      query["datosPaciente.nombre"] = { $regex: nombre, $options: "i" };
    }
    if (socorrista) {
      query["datosLugarControl.socorrista"] = { $regex: socorrista, $options: "i" };
    }
    if (fecha) {
      query["datosCronometria.fecha"] = fecha;
    }
    
    let data = await db.collection("FRAP").find(query).project({ _id: 0 }).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error in combined search:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Lista usuarios
app.get("/Usuarios", async (req, res) => {
  try {
    
    let data = await db.collection("Usuarios").find({})
      .project({ 
        _id: 0,          
        password: 0       
      })
      .toArray();
    
    // Transformar los datos para que coincidan con el formato del frontend
    const transformedData = data.map((user, index) => ({
      id: index + 1,  // Generar ID incremental
      name: user.nombre ? user.nombre.split(' ')[0] : 'N/A',  
      apellido: user.nombre ? user.nombre.split(' ').slice(1).join(' ') : 'N/A',  
      email: user.usuario,
      role: user.tipo || 'N/A',
      turno: user.turno || 'N/A',
      password: '***'  // Ocultar contraseña por seguridad
    }));
    
    res.json(transformedData);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//createOne reportes
app.post("/reportes", async (req, res) => {
  let valores = req.body;
  // valores["id"]=Number(valores["id"])
  let data = await db.collection("FRAP").insertOne(valores);
  res.json(data);
});

//createOne usuarios
app.post("/Usuarios", async (req, res) => {
  let user = req.body.email;
  let pass = req.body.password;
  let nombre = req.body.name + " " + req.body.apellido;
  let tipo = req.body.role;
  let turno = req.body.turno;
  console.log("Received user data:", req.body);
  let data = await db.collection("Usuarios").findOne({ usuario: user });
  console.log("User inserted:", data);
  // Verifica si el usuario ya existe
  if (data == null) {
    const hash = await argon2.hash(pass, {
      type: argon2.argon2id,
      memoryCost: 19 * 1024,
      timeCost: 2,
      parallelism: 1,
      saltLength: 16,
    });
    let usuarioAgregar = {
      usuario: user,
      password: hash,
      nombre: nombre,
      tipo: tipo,
      turno: turno,
    };
    data = await db.collection("Usuarios").insertOne(usuarioAgregar);
    res.json(data);
    // res.sendStatus(201);
    console.log("Usuario creado:", usuarioAgregar);
    log( "/Usuarios", "Se creó un nuevo usuario ${user}");
    // Si el usuario ya existe, devuelve un error 403
  } else {
    res.sendStatus(403);
  }
});

//login
app.post("/login", async (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;
  let data = await db.collection("Usuarios").findOne({ usuario: user });
  // no existe el usuario
  if (data == null) {
    res.sendStatus(401);
    // existe el usuario, verifica password
  } else if (await argon2.verify(data.password, pass)) {
    let token = jwt.sign({ usuario: data.usuario }, "TC2007BDabeca", {
      expiresIn: 900,
    });
    res.json({ token: token, id: data.usuario, nombre: data.nombre });
  } else {
    res.sendStatus(401);
  }
});

//createOne emergencias
app.post("/emergencias", async (req, res) => {
  try {
    let valores = req.body;
    let data = await db.collection("emergencias").insertOne(valores);
    res.json(data);
  } catch (error) {
    console.error("Error creating emergencia:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//deleteOne reportes 
app.delete("/reportes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Attempting to delete report with id:", id);
    
    let query = {};

    // If it's a numeric ID
    if (!isNaN(Number(id))) {
      query = { id: Number(id) };
    } else {
      // If not numeric, try as string or ObjectId
      query = { 
        $or: [
          { id: id },
          { _id: id },
        ]
      };
    }
    
    let data = await db.collection("FRAP").deleteOne(query);
    
    if (data.deletedCount === 0) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
    
    console.log("Report deleted successfully:", data);
    res.json({ message: "Reporte eliminado exitosamente", deletedCount: data.deletedCount });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// deleteOne usuarios
app.delete("/Usuarios/:usuario", async (req, res) => {
  try {
    const usuario = decodeURIComponent(req.params.usuario);
    
    let data = await db.collection("Usuarios").deleteOne({"usuario": usuario});
    
    if (data.deletedCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    console.log("User deleted successfully:", data);
    res.json({ message: "Usuario eliminado exitosamente", deletedCount: data.deletedCount });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


// //updateOne
// app.put("/reportes/:id", async(req,res)=>{
// 	let valores=req.body
// 	valores["id"]=Number(valores["id"])
// 	let data =await db.collection("ejemplo402").updateOne({"id":valores["id"]}, {"$set":valores})
// 	data=await db.collection("ejemplo402").find({"id":valores["id"]}).project({_id:0}).toArray();
// 	res.json(data[0]);
// })

// Cambia la función log para aceptar req y guardar la IP
async function log(req, objeto, accion) {
  const toLog = {
    timestamp: new Date(),
    endpoint: objeto,
    accion: accion,
    ip: req.ip,
  };
  await db.collection("log402").insertOne(toLog);
}

//Obtener historial de usuarios
app.get("/logs", async (req, res) => {
  try {
    const logs = await db.collection("log402").find({}).sort({ timestamp: -1 }).limit(200).toArray();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener logs" });
  }
});


async function connectToDB(){
	let client=new MongoClient(await process.env.DB);
	await client.connect();
	db=client.db();
	console.log("conectado a la base de datos");
}

const options = {
      key: fs.readFileSync('backend.key'),
      cert: fs.readFileSync('backend.crt')
    };

https.createServer(options, app).listen(3000, async () => {
		await process.loadEnvFile(".env");
		connectToDB();
      	console.log('HTTPS Server running on port 3000');
});

/*
async function connectToDB() {
  const uri =
    "mongodb+srv://a01028209_db_user:1kPxdjGMmjhvDriA@cluster0.npixfou.mongodb.net/";
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("pcc");
  console.log("✅ Conectado a MongoDB Atlas");
}


app.listen(PORT, () => {
  connectToDB();
  console.log("aplicacion corriendo en puerto 3000");
});
*/
