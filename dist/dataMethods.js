"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = exports.filterByID = exports.getResource = void 0;
const fs = __importStar(require("node:fs"));
const dns = "https://api.attackontitanapi.com";
const regex = /([&?])page=\d+/gi;
const dataPerPage = 20;
//returns the array of objects for the specified file
const getResource = (file) => {
    const data = fs.readFileSync(`data/${file}.json`, "utf-8");
    return JSON.parse(data);
};
exports.getResource = getResource;
//method for getting resource by id param
const filterByID = (req, resourceData) => {
    //loops through each array and adds to the filtered array only if the ids match
    const filteredResourceArr = [];
    //if users want multiple characters they split the ids by commas and we split this into an array
    const idArr = req.params.id.split(",");
    for (let i = 0; i < resourceData.length; i++) {
        for (let j = 0; j < idArr.length; j++) {
            if (resourceData[i].id == parseInt(idArr[j])) {
                filteredResourceArr[i] = resourceData[i];
            }
        }
    }
    return filteredResourceArr;
};
exports.filterByID = filterByID;
//creates the response object
const buildResponse = (
//takes in the query and the resource array
req, content) => {
    //formats a url string for the next and prev page properties
    let queriesString = req.originalUrl.replace(regex, "").replace(req.path, "");
    const pagesArr = [];
    //the object that is returned default values are 0, 0, null, and null, and an empty array
    const response = {
        info: {
            count: 0,
            pages: 0,
            next_page: null,
            prev_page: null,
        },
        results: [],
    };
    response.info.count = content.length;
    //splits the resource array into an array of sub arrays with a max length of specified number
    for (let i = 0; i < content.length; i += dataPerPage) {
        const subArr = content.slice(i, i + dataPerPage);
        pagesArr.push(subArr);
    }
    response.info.pages = pagesArr.length;
    //if the pagesArr has more than one page then we need to set all the values of the DataResponse object
    if (pagesArr.length > 1) {
        //check if the user queried for a specific page if not we return the first page
        if (req.query.page != undefined) {
            const pageNum = parseInt(req.query.page);
            const pageIndex = pageNum - 1;
            response.results = pagesArr[pageIndex];
            //correctly setting the prev_page and next_page properties based on the current page
            if (pageNum <= pagesArr.length) {
                response.info.next_page = `${dns + req.path}?page=${pageNum + 1 + queriesString}`;
            }
            if (pageNum != 1) {
                response.info.prev_page = `${dns + req.path}?page=${pageNum - 1 + queriesString}`;
            }
        }
        else {
            response.results = pagesArr[0];
            response.info.next_page = `${dns + req.path}?page=2${queriesString}`;
        }
    }
    else {
        response.results = pagesArr[0];
    }
    return response;
};
exports.buildResponse = buildResponse;
