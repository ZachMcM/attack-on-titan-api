# Documentation

## Introduction
This documentation will help you understand the endpoints and resources of the Attack on Titan API and show you how to make different queries, so you can use it in your next project!

#### Base url: [https://api.attackontitanapi.com](https://api.attackontitanapi.com)
The base url contains an object of all the endpoints. All requests are `GET`, go over `htttps` and are returned as `JSON` objects.

```
GET https://api.attackontitanapi.com
```

```json
{
    characters: "https://api.attackontitanapi.com/characters",
    episodes: "https://api.attackontitanapi.com/episodes",
    locations: "https://api.attackontitanapi.com/locations",
    organizations: "https://api.attackontitanapi.com/organizations",
    titans: "https://api.attackontitanapi.com/titans",
}
```
There are currently 5 endpoints/resources:
- [Characters](https://api.attackontitanapi.com/characters): used to get all the characters
- [Episodes](https://api.attackontitanapi.com/episodes): used to get all the episodes
- [Locations](https://api.attackontitanapi.com/locations): used to get all the locations
- [Organizations](https://api.attackontitanapi.com/organizations): used to get all the organizations
- [Titans](https://api.attackontitanapi.com/titans): used to get all the titans

## Info and Pagination
The Attack on Titan API automatically paginates the responses. Users can recieve up to 20 documents per page. Each resource/endpoint has an `info` object with information about the response. 

| Key        | Type           | Description  |
| ------------- |:-------------:| -----:|
| count | int | the total number of resources |
| pages | int | the total number of pages |
| next_page | string or null | the link to the next page of resources |
| prev_page | string or null | the link to the next previous of resources |

```
GET https://api.attackontitanapi.com/characters
```

```json
{
    "info": {
        "count": 201,
        "pages": 11,
        "next_page": "https://api.attackontitanapi.com/characters?page=2","prev_page": null
    },
    "results": [
        // ... 
    ]
}
```

### Characters
There is a total of `201` characters sorted by id (sorted alphabetically by last name). 

#### Character schema

| Key        | Type           | Description  |
| ------------- |:-------------:| -----:|
| id | int | the character's id |
| name | string | the character's name | 
| img | string | a link to an image of the character |
| alias | string[] | an array of all the character's aliases |
| species | string[] | an array of species the character falls under |
| gender | string | the character's gender |
| age | int | the character's age |
| height | string | the character's height |
| relatives | object[] | an array of all the family groups the character is related to |
| birthplace | string | the character's birthplace |
| residence | string | the character's residence | 
| status | string | if the character is alive or dead |
| occupation | string | the character's occupation |
| groups | object[] | an array of all the groups the character belongs to |
| roles | string[] | a string array of all the character's roles |
| episodes | string[] | all the episodes the character appears in |
 
```
GET https://api.attackontitanapi.com/characters
```

```json
{
  "info": {
    "count": 201,
    "pages": 11,
    "next_page": "https://api.attackontitanapi.com/characters?page=2",
    "prev_page": null
  },
  "results": [
    {
      "id": 1,
      "name": "Armin Arlelt",
      "img": "https://static.wikia.nocookie.net/shingekinokyojin/images/9/93/Armin_Arlelt_%28Anime%29_character_image.png/revision/latest/scale-to-width-down/350?cb=20210322005647",
      "alias": [
        "Colossal Titan"
      ],
      "species": [
        "Human",
        "Intelligent Titan"
      ],
      "gender": "Male",
      "age": 19,
      "height": "60 m (Colossal Titan form)",
      "relatives": [
        {
          "family": "Arlelt family",
          "members": [
            "Unnamed father",
            "Unnamed mother",
            "Unnamed grandfather"
          ]
        }
      ],
      "birthplace": "Shiganshina District",
      "residence": "Wall Rose",
      "status": "Alive",
      "occupation": "Soldier",
      "groups": [
        {
          "name": "Scout Regiment",
          "sub_groups": [
            "Special Operations Squad"
          ]
        }
      ],
      "roles": [
        "Colossal Titans",
        "Scout Regiment Commanders"
      ],
      "episodes": [
        "https://api.attackontitanapi.com/episodes/1",
        "https://api.attackontitanapi.com/episodes/2",
        "https://api.attackontitanapi.com/episodes/3",
        "https://api.attackontitanapi.com/episodes/4",
        "https://api.attackontitanapi.com/episodes/5",
        "https://api.attackontitanapi.com/episodes/6",
        "https://api.attackontitanapi.com/episodes/7",
        // ...
      ]
    },
    // ...
  ]
}
```