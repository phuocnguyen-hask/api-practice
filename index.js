import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
        const result = (await axios.get(API_URL + `recommendations/anime`));
        res.render("index.ejs", {pageCss: "index.css", datas: result.data.data});
    } catch (error) {
        res.render("error.ejs", {pageCss: "error.css", error: error});
    }
})

app.get("/genre-search", async (req, res) => {
    const genreId = req.query.genreId;
    try{
        const result = (await axios.get(API_URL + `anime?genres=${genreId}`));
        res.render("genre.ejs", {pageCss: "season.css", datas: result.data.data});
    } catch (error) {
        res.render("error.ejs", {pageCss: "error.css", error: error});
    }
    
})

app.get("/season-search", async (req, res) => {
    const year = req.query.year;
    const season = req.query.season;
    try{
        const result = (await axios.get(API_URL + `season/${year}/${season}`));
        res.render("season.ejs", {pageCss: "season.css", datas: result.data.data});
    } catch (error) {
        res.render("error.ejs", {pageCss: "error.css", error: error});
    }
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})