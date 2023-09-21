import "dotenv/config";
import express from "express";
import { initDB } from "./DBmanagment/DBprimary";
import { serverRoutes } from "./Routes/routes";
import cookieParser from "cookie-parser";
import cors from 'cors';

const corsOptions = {
  // origin: 'http://localhost:5173',
  origin: '*',
}

const app = express();
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());
initDB()
  .then(
    ()=>serverRoutes(app)
  )
  .catch((error) => console.log(error))
  .finally(() => {
    app.listen(process.env.PORT, () =>
      console.log(`server listening at ${process.env.PORT}`)
    );
  });
