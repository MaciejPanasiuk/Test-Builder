import "dotenv/config";
import express from "express";
import { initDB } from "./DBmanagment/DBprimary";
import { serverRoutes } from "./Routes/routes";
import cookieParser from "cookie-parser";

const app = express();
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
