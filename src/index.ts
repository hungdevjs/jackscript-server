import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import seed from "../seed";
import routes from "./routes/index";
import environment from "./utils/environment";

// import { getSamples, generateSignature } from "./services/cloudinary.service";
// getSamples();
// console.log({ response: generateSignature() });

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

  app.listen(environment.PORT, () => console.log(`App is running on port ${environment.PORT}`));
};

main();
