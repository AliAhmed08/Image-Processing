import express from "express";
const app = express();
const port = 3000;

import routes from "./routes/index";

app.use("/", routes);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
