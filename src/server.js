import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";
import discosRoutes from "./routes/discos.routes.js";
import { authMiddleware } from "./middlewares/auth.js";

const app = express();


app.use(cors()); 
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);

app.use("/api/discos", discosRoutes);



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`) 
    });
