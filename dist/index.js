"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//all methods needed for generating response
const dataMethods_1 = require("./dataMethods");
const dataMethods_2 = require("./dataMethods");
const dataMethods_3 = require("./dataMethods");
const app = (0, express_1.default)();
//default endpoints
app.get("/api", (req, res) => {
    res.json([
        "https://attackontitanapi.com/api/characters",
        "https://attackontitanapi.com/api/episodes",
        "https://attackontitanapi.com/api/locations",
        "https://attackontitanapi.com/api/organizations",
        "https://attackontitanapi.com/api/titans",
    ]);
});
//characters by id
app.get("/api/characters/:id", (req, res) => {
    let data = (0, dataMethods_2.getResource)("characters");
    data = (0, dataMethods_3.filterByID)(req, data);
    res.json(data);
});
//characters by query
app.get("/api/characters", (req, res) => {
    let characters = (0, dataMethods_2.getResource)("characters");
    if (req.query.name != undefined) {
        characters = characters.filter((character) => character.name.toLowerCase().includes(req.query.name));
    }
    if (req.query.gender != undefined) {
        characters = characters.filter((character) => character.gender.toLowerCase() ==
            req.query.gender.toLowerCase());
    }
    if (req.query.status != undefined) {
        characters = characters.filter((character) => character.status.toLowerCase() ==
            req.query.status.toLowerCase());
    }
    if (req.query.occupation != undefined) {
        characters = characters.filter((character) => character.occupation.toLowerCase() ==
            req.query.occupation.toLowerCase());
    }
    const response = (0, dataMethods_1.buildResponse)(req, characters);
    res.json(response);
});
//episodes by id
app.get("/api/episodes/:id", (req, res) => {
    let data = (0, dataMethods_2.getResource)("episodes");
    data = (0, dataMethods_3.filterByID)(req, data);
    res.json(data);
});
//episodes by query
app.get("/api/episodes", (req, res) => {
    let episodes = (0, dataMethods_2.getResource)("episodes");
    if (req.query.episode != undefined) {
        episodes = episodes.filter((episode) => episode.episode
            .toLowerCase()
            .includes(req.query.episode.toLowerCase()));
    }
    if (req.query.name != undefined) {
        episodes = episodes.filter((episode) => episode.name
            .toLowerCase()
            .includes(req.query.name.toLowerCase()));
    }
    const response = (0, dataMethods_1.buildResponse)(req, episodes);
    res.json(response);
});
//locations by id
app.get("/api/locations/:id", (req, res) => {
    let data = (0, dataMethods_2.getResource)("locations");
    data = (0, dataMethods_3.filterByID)(req, data);
    res.json(data);
});
//locations by query
app.get("/api/locations", (req, res) => {
    let locations = (0, dataMethods_2.getResource)("locations");
    if (req.query.name != undefined) {
        locations = locations.filter((location) => location.name
            .toLowerCase()
            .includes(req.query.name.toLowerCase()));
    }
    if (req.query.territory != undefined) {
        locations = locations.filter((location) => location.territory
            .toLowerCase()
            .includes(req.query.territory.toLowerCase()));
    }
    if (req.query.region != undefined) {
        locations = locations.filter((location) => location.region
            .toLowerCase()
            .includes(req.query.region.toLowerCase()));
    }
    const response = (0, dataMethods_1.buildResponse)(req, locations);
    res.json(response);
});
//organizations by id
app.get("/api/organizations/:id", (req, res) => {
    let data = (0, dataMethods_2.getResource)("organizations");
    data = (0, dataMethods_3.filterByID)(req, data);
    res.json(data);
});
//organizations by query
app.get("/api/organizations", (req, res) => {
    let organizations = (0, dataMethods_2.getResource)("organizations");
    if (req.query.name != undefined) {
        organizations = organizations.filter((organization) => organization.name
            .toLowerCase()
            .includes(req.query.name.toLowerCase()));
    }
    if (req.query.affiliation != undefined) {
        organizations = organizations.filter((organization) => organization.affiliation
            .toLowerCase()
            .includes(req.query.affiliation.toLowerCase()));
    }
    const response = (0, dataMethods_1.buildResponse)(req, organizations);
    res.json(response);
});
//titans by id
app.get("/api/titans/:id", (req, res) => {
    let data = (0, dataMethods_2.getResource)("titans");
    data = (0, dataMethods_3.filterByID)(req, data);
    res.json(data);
});
//titans by query
app.get("/api/titans", (req, res) => {
    let titans = (0, dataMethods_2.getResource)("titans");
    const filteredTitans = [];
    //only way to filter titans is by allegiance, we have to search through the allegiance array of every Titan object
    if (req.query.allegiance != undefined) {
        const allegianceArr = req.query.allegiance.split(",");
        for (const titan of titans) {
            for (let i = 0; i < titan.allegiance.length; i++) {
                for (let j = 0; j < allegianceArr.length; j++) {
                    if (titan.allegiance[i]
                        .toLowerCase()
                        .includes(allegianceArr[j].toLowerCase())) {
                        filteredTitans.push(titan);
                    }
                }
            }
        }
    }
    const response = (0, dataMethods_1.buildResponse)(req, filteredTitans);
    res.json(response);
});
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});
