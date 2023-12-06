# Flights (stats) API

Implementing a small web-server that gives information on inbound and outbound flights from TLV airport

## Installation

Using docker compose

```bash
git clone https://github.com/orelmoshe/flightsAPI
docker-compose up --build
```

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

Go to http://localhost:8080/

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

## API described

### Build a web-server using the API described in

https://data.gov.il/dataset/flydata/resource/e83f763b-b7d7-479e-b172-ae981ddc6de5

### Base URL

https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-
ae981ddc6de5&limit=300

#### All the queries will be limited and the data can change durting time, that means the same query can have different result in long enough time span.

#### API results fields:

```bash
  _id: record positive index
  CHOPER: flight Code
  CHFLTN: flight number
  CHOPERD: airline company
  CHSTOL: estimated departure time
  CHPTOL: real departure time
  CHAORD: gate
  CHLOC1: short version destination Airport
  CHLOC1D: full name destination airport
  CHLOC1TH: city Hebrew - name
  CHLOC1T: city English- name
  CHLOC1CH: country Hebrew - name
  CHLOCCT: country English - name
  CHTERM: TLV Terminal
  CHCINT: TLV check-in counter - if empty inbound flights else outbound flight
  CHCKZN: TLV check in zone - if empty inbound flights else outbound flight
  CHRMINE: status in English
  CHRMINH: status in Hebrew

```
