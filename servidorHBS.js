import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import {Server as HttpServer} from "http";
import {Server as IOServer} from "socket.io";
import passport from 'passport';
import {cpus as numCPUS} from 'os'
import cluster from 'cluster';
import compression from 'compression';

import lista from './prodAleatorios.js'
import {daoMensaje } from './src/index.js';
import normalizado from './src/config/configNormalizado.js'
import {logueoWarning, logueoInfo, logueoError}from './src/config/confWinston.js';
import {PORT,arg} from './src/config/configEntorno.js'

import routerProductos from './src/routes/routerProductos.js'
import routerCarrito from './src/routes/routerCarrito.js'
import routerApiRandoms from './src/routes/routerApiRandoms.js'
import {routerRegister, routerLogin, routerLogout, routerHome} from './src/routes/routerViews.js'
import auth from './src/routes/middleware/auth.js'

//------------SETEO DE SERVER----------
const app= express(); 
const httpServer = new HttpServer(app) 
const io = new IOServer(httpServer)

//--------------SETEO DE VISTAS------------
app.engine('handlebars',exphbs.engine())
app.use(express.static('views'))
app.set('view engine','handlebars')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

//-----------SETEO DE PASSPORT-SESION---------
app.use(session({
  secret: 'secreto', 
  cookie:{
    httpOnly:false,
    secure:false,
    //maxAge: 60000 * 10 // 10 MINUTOS
  },  
  rolling:true,
  resave:true,
  saveUninitialized:false,
}))  
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((username,done)=>done(null, username.username))
passport.deserializeUser((username,done)=>{
  done(null, username)}
  )
  //--------------ROUTERS-----------
app.use('/api/randoms',routerApiRandoms)
app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)
app.use('/register', routerRegister)
app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/', routerHome)

const errorRuta= {error: -2, descripcion: `ruta no implementada`}

app.all('*', logueoWarning,(req,res)=>{
  res.json(errorRuta)
  })

const info ={
  argumentos: JSON.stringify(arg),
  sistema:process.platform,
  versionNode:process.version,  
  memoria:process.memoryUsage().rss,
  pathEjecucion:process.execPath,
  proccessId:process.pid,
  carpetaProyecto:process.cwd(),
  cantProcesadores:numCPUS().length
}
app.get('/info', logueoInfo, (req, res) => {
  info.compIsTrue = 'No Comprimida'
  res.render("info",info)
})
app.get('/infoComp', compression(), logueoInfo, (req, res) => {
  info.compIsTrue = 'Comprimida'
  res.render("info",info)
})
app.get('/api/productos-test',auth, logueoInfo,(req, res) => {
  let tablaProductos=lista()
  res.render("tablaAleatoria", {tablaProductos});
})

//------------------WEBSOCKETS------------------------------

let mensajes1=[]
let mensajesNormalizados;

io.on("connection", (socket) => { 
  console.log("Usuario Conectado");

  if (!mensajes1.length) {
    mensajesNormalizados=[]
  } else {
    mensajesNormalizados= normalizado(mensajes1)
  }
  socket.emit("mensajes",mensajesNormalizados);
  socket.on("mensajeNuevo", (newMessage) => {
    mensajes1.push(newMessage);
    mensajesNormalizados= normalizado(mensajes1)

    daoMensaje.guardar(newMessage)
    io.sockets.emit("mensajes", mensajesNormalizados);
  });
});

//-------------RUTAS POR DEFAULT------------


//---------------SERVER LISTEN------------------------------

if ((!arg.CLUSTER&&!arg.cluster)|| !cluster.isPrimary){
  console.log(`Proceso Worker ${process.pid} Iniciado`);

  const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor con Websockets en el puerto ${connectedServer.address().port}`);
  });
  connectedServer.on("error", (error) =>   
  logueoError(`El error en server fue el siguiente: `, error)  
  );  

} else {
  console.log('MODO CLUSTER')      
  console.log(`Proceso Master ${process.pid} Iniciado`);

    for (let i = 0; i < numCPUS().length; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} murio`);
      cluster.fork();
    });
  }
