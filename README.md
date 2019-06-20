
# Pokemon API

A Pokemon Serverless Node.js API

*Create*

```bash
curl -XPOST -H "Content-type: application/json" -d '{
	"dexId": 7,
	"name": "squirtle",
	"type1": "water",
	"generation": 1
}' 'https://zra1bg2zwl.execute-api.us-east-1.amazonaws.com/dev/pokemon'
```
```json
{
  "data": {
    "_id": "5d0bce9eae765b0008bd5796",
    "dexId": 7,
    "name": "squirtle",
    "type1": "water",
    "generation": 1,
    "__v": 0
  }
}
```


*READ ALL*

```bash
curl -XGET -H "Content-type: application/json" 'https://zra1bg2zwl.execute-api.us-east-1.amazonaws.com/dev/pokemon'
```
```json
{
  "data": [
    {
      "_id": "5d0bc9964df77839a8d63574",
      "dexId": 1,
      "name": "bulbasaur",
      "type1": "grass",
      "generation": 1,
      "__v": 0,
      "type2": null
    },
    {
      "_id": "5d0bc9cc4df77839a8d63575",
      "dexId": 2,
      "name": "ivysaur",
      "type1": "grass",
      "generation": 1,
      "__v": 0
    },
    {
      "_id": "5d0bca77e35c1e4ca8c97891",
      "dexId": 3,
      "name": "venasaur",
      "type1": "grass",
      "type2": "poison2",
      "generation": 1,
      "__v": 0
    },
    {
      "_id": "5d0bca8ae35c1e4ca8c97892",
      "dexId": 4,
      "name": "charmander",
      "type1": "fire",
      "generation": 1,
      "__v": 0
    },
    {
      "_id": "5d0bca98e35c1e4ca8c97893",
      "dexId": 5,
      "name": "charmeleon",
      "type1": "fire",
      "generation": 1,
      "__v": 0
    },
    {
      "_id": "5d0bcab6e35c1e4ca8c97894",
      "dexId": 6,
      "name": "charizard",
      "type1": "fire",
      "type2": "flying",
      "generation": 1,
      "__v": 0
    }
  ]
}
```

*READ ONE*

```bash
curl -XGET -H "Content-type: application/json" 'https://zra1bg2zwl.execute-api.us-east-1.amazonaws.com/dev/pokemon/1'
```
```json
{
  "data": {
    "_id": "5d0bc9964df77839a8d63574",
    "dexId": 1,
    "name": "bulbasaur",
    "type1": "grass",
    "generation": 1,
    "__v": 0,
    "type2": null
  }
}
```

*UPDATE*

```bash
curl -XPUT -H "Content-type: application/json" -d '{
	"name": "charizard",
	"type1": "fire",
	"type2": "flying",
	"generation": 1
}' 'https://zra1bg2zwl.execute-api.us-east-1.amazonaws.com/dev/pokemon/6'
```
```json
{
  "data": {
    "name": "charizard",
    "type1": "fire",
    "type2": "flying",
    "generation": 1
  }
}
```

*DELETE*

```bash
curl -XDELETE -H "Content-type: application/json" 'https://zra1bg2zwl.execute-api.us-east-1.amazonaws.com/dev/pokemon/6'
```

```json
{
  "message": "pokemon deleted",
  "data": {
    "_id": "5d0bce9eae765b0008bd5796",
    "dexId": 7,
    "name": "squirtle",
    "type1": "water",
    "generation": 1,
    "__v": 0
  }
}
```
