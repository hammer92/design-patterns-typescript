import express from "express";
import * as routes from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

routes.register(app);

app.listen(port, (): void => {
  console.log(`server is listening on ${port}`);
});
