# Flights (stats) API

Implementing a small web-server that gives information on inbound and outbound flights from TLV airport

## Installation

Using local

```bash
git clone https://github.com/orelmoshe/flightsAPI
npm install
npm start
```

Running Tests

```bash
npm run test
```

## Usage Swagger

Go to http://localhost:5000/

## Endpoints

### GET /flights/stats/total

get total flights, if country parameter exist filter by country

##### Parameters

- country - text [optional]

### GET /flights/stats/outbound

get total outbound flights, if country parameter exist filter by country

##### Parameters

- country - text [optional]

### GET /flights/stats/inbound

get total inbound flights, if country parameter exist filter by country

##### Parameters

- country - text [optional]

### GET flights/stats/delayed

get number of delayed flights

### GET flights/stats/popular

get the most popular city destination

### GET flights/getaway

if exist two flights one from Israel and one to Israel that someone can take for a quick getaway -
considering date and time, get arrival and departure flights codes, ignore the flight duration.
