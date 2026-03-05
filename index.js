import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {pageCss:""});
})

app.get("/genre-search", async (req, res) => {
    const genreId = req.query.genreId;
    const result = (await axios.get(API_URL + `anime?genres=${genreId}`));
    res.render("genre.ejs", {pageCss: "season.css", datas: result.data.data});
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})