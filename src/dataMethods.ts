import * as fs from "node:fs";

//all of our types
import { DataResponse } from "./types";
import { Character } from "./types";
import { Episode } from "./types";
import { Location } from "./types";
import { Organization } from "./types";
import { Titan } from "./types";
import { Request } from "express";

const dns = "https://api.attackontitanapi.com";
const regex = /([&?])page=\d+/gi;
const dataPerPage = 20;

//returns the array of objects for the specified file
export const getResource = (file: string) => {
  const data = fs.readFileSync(`data/${file}.json`, "utf-8");
  return JSON.parse(data);
};

//method for getting resource by id param
export const filterByID = (
  req: Request,
  resourceData: Character[] | Episode[] | Location[] | Organization[] | Titan[]
): Character[] | Episode[] | Location[] | Organization[] | Titan[] => {
  //loops through each array and adds to the filtered array only if the ids match
  const filteredResourceArr: any= [];

  //if users want multiple characters they split the ids by commas and we split this into an array
  const idArr = req.params.id.split(",");
  for (let i = 0; i < resourceData.length; i++) {
    for (let j = 0; j < idArr.length; j++) {
      if (resourceData[i].id == parseInt(idArr[j])) {
        filteredResourceArr.push(resourceData[i])
      }
    }
  }

  return filteredResourceArr;
};

//creates the response object
export const buildResponse = (
  //takes in the query and the resource array
  req: Request,
  content: Character[] | Episode[] | Location[] | Organization[] | Titan[]
): DataResponse => {
  //formats a url string for the next and prev page properties
  let queriesString = req.originalUrl.replace(regex, "").replace(req.path, "");

  const pagesArr: any = [];

  //the object that is returned default values are 0, 0, null, and null, and an empty array
  const response: DataResponse = {
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
      const pageNum = parseInt(<string>req.query.page);
      const pageIndex = pageNum - 1;
      response.results = pagesArr[pageIndex];
      //correctly setting the prev_page and next_page properties based on the current page
      if (pageNum <= pagesArr.length) {
        response.info.next_page = `${dns + req.path}?page=${pageNum + 1 + queriesString}`;
      }
      if (pageNum != 1) {
        response.info.prev_page = `${dns + req.path}?page=${pageNum - 1 + queriesString}`;
      }
    } else {
      response.results = pagesArr[0];
      response.info.next_page = `${dns + req.path}?page=2${queriesString}`;
    }
  } else {
    response.results = pagesArr[0];
  }

  return response;
};
