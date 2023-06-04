import express from "express";

const app = express();
const port = 5001;

app.get("/", (_req, res) => res.send("Hello!"));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
