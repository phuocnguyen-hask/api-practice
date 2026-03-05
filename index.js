import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {pageCSS:""});
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})