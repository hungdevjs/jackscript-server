import express from "express";
import { Request, Response } from "express";

import seed from "../seed";

const main = async () => {
  await seed();

  const app = express();

  app.get("/", (req: Request, res: Response) => {
    res.send("Application works!");
  });

  app.listen(8000, () => {
    console.log("Application started on port 3000!");
  });
};

main();
