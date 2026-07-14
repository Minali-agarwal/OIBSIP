import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import { isAuthenticated } from "./middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 5000;

const __filename=fileURLToPath(import.meta.url);

const __dirname=path.dirname(__filename);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({

secret:"mySecretKey",

resave:false,

saveUninitialized:false

}));

app.use(express.static("public"));

app.use("/auth",authRoutes);

app.get("/",(req,res)=>{

res.redirect("/login.html");

});



app.get("/dashboard",isAuthenticated,(req,res)=>{

res.sendFile(path.join(__dirname,"views","dashboard.html"));

});

app.listen(PORT,()=>{

console.log(`Server running on http://localhost:${PORT}`);

});