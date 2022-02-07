import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import seed from "../seed";
import routes from "./routes/index";

dotenv.config();

const main = async () => {
  await seed();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsConfig = {
    origin: true,
    credentials: true,
  };
  app.use(cors(corsConfig));

  app.get("/", (_req: Request, res: Response) => res.send("JackScript server!!!"));

  app.use("/api", routes);

  app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`));
};

main();
