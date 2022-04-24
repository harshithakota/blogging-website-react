// const app = require("./index");
import app from "./index.js"

app.listen(process.env.PORT || 9002, () => console.log("server starting on port 9002!"));
