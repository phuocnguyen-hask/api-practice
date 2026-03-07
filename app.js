import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import recentAnimes from "./public/data/recent.json" with {type: "json"};
import hotTvs from "./public/data/hot-tv.json" with {type: "json"};
import hotMovies from "./public/data/hot-movie.json" with {type: "json"};
import hotOvas from "./public/data/hot-ova.json" with {type: "json"};

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";
const allRecentAnimes = recentAnimes.data;
const allHotTv = hotTvs.data;
const allHotMovies = hotMovies.data;
const allHotOvas = hotOvas.data;

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.recentAnimes = allRecentAnimes.slice(0, 10);
    res.locals.hotTvs = allHotTv.slice(0, 10);
    res.locals.hotMovies = allHotMovies.slice(0, 10);
    res.locals.hotOvas = allHotOvas.slice(0, 10);
    next();
});

app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs", {pageCss: "index.css"});
})

app.get("/genre-search", async (req, res) => {
    const genreId = req.query.genreId;
    try{
        const result = (await axios.get(API_URL + `anime?genres=${genreId}`));
        res.render("genre.ejs", {pageCss: "season.css", datas: result.data.data.slice(10)});
    } catch (error) {
        res.render("error.ejs", {pageCss: "error.css", error: error});
    }
    
})

app.get("/season-search", async (req, res) => {
    const year = req.query.year;
    const season = req.query.season;
    try{
        const result = (await axios.get(API_URL + `seasons/${year}/${season}`));
        res.render("season.ejs", {pageCss: "season.css", datas: result.data.data});
    } catch (error) {
        res.render("error.ejs", {pageCss: "error.css", error: error});
    }
})

app.get("/detail", async (req, res) => {
    const id = req.query.id;
    try{
        const result = (await axios.get(API_URL + `anime/${id}`));
        const data = result.data;
        res.render("detail.ejs", {pageCss: "detail.css", data:data.data});
    } catch (error) {
        res.render("error.ejs", {pageCss: "error.css", error: error});
    }
});

app.get("/random", async (req, res) => {
    const result = (await axios.get(API_URL + `random/anime`)).data;
    const randomAnime = result.data;
    res.render("detail.ejs", {pageCss: "detail.css", data: randomAnime});
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})