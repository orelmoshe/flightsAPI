import axios from 'axios';

import { HttpCodes } from '../shared/const/http-codes';
import logger from '../services/logger';

const baseURL = 'https://data.gov.il/api/3/action/datastore_search';
const apiURL = `${baseURL}?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=300`;

const delayedFlightsFilter = `&filters={"CHRMINE":"DELAYED"}`;
const cityNameFilter = `&fields=CHLOC1T`;
const sortByDate = '&sort=CHPTOL asc';

export const totalFlights = async (req, res, next) => {
	try {
		let url = apiURL;
		if (req.query?.country) {
			url += `&filters={"CHLOCCT":"${req.query?.country}"}`;
		}
		const { data } = await axios.get(url);
		const total = data?.result?.total || 0;
		res.status(HttpCodes.OK).json({ data: total });
	} catch (ex) {
		const err = `Failed to get total flights, Error: ${ex}`;
		logger.error(err);
		res.status(HttpCodes.ERROR).json({ message: err });
	}
};

export const totalInboundFlights = async (req, res, next) => {
	try {
		let url = apiURL;
		if (req.query?.country) {
			url += `&filters={"CHLOCCT":"${req.query?.country}"}`;
		}
		const { data } = await axios.get(url);
		const totalInbound = data.result?.records.filter((record) => !record.CHCINT || !record.CHCKZN).length || 0;
		res.status(HttpCodes.OK).json({ data: totalInbound });
	} catch (ex) {
		const err = `Failed to get total inbound flights, Error: ${ex}`;
		logger.error(err);
		res.status(HttpCodes.ERROR).json({ message: err });
	}
};

export const totalOutboundFlights = async (req, res, next) => {
	try {
		let url = apiURL;
		if (req.query?.country) {
			url += `&filters={"CHLOCCT":"${req.query?.country}"}`;
		}
		const { data } = await axios.get(url);
		const totalOutbound = data.result?.records.filter((record) => record.CHCINT || record.CHCKZN).length || 0;
		res.status(HttpCodes.OK).json({ data: totalOutbound });
	} catch (ex) {
		const err = `Failed to get total outbound flights, Error: ${ex}`;
		logger.error(err);
		res.status(HttpCodes.ERROR).json({ message: err });
	}
};

export const totalDelays = async (req, res, next) => {
	try {
		let url = apiURL + delayedFlightsFilter;
		const { data } = await axios.get(url);
		const total = data?.result?.total || 0;
		res.status(HttpCodes.OK).json({ data: total });
	} catch (ex) {
		const err = `Failed to get total delays flights, Error: ${ex}`;
		logger.error(err);
		res.status(HttpCodes.ERROR).json({ message: err });
	}
};

export const mostPopularDestination = async (req, res, next) => {
	try {
		let url = apiURL + cityNameFilter;
		const { data } = await axios.get(url);
		let countsByCity = {};
		const records = data?.result?.records;
		let max = 0;
		let mostPopular = '';
		records.forEach((item) => {
			if (!item.CHLOC1T) {
				return;
			}
			countsByCity[item.CHLOC1T] = ++countsByCity[item.CHLOC1T] || 0;
			if (max < countsByCity[item.CHLOC1T]) {
				max = countsByCity[item.CHLOC1T];
				mostPopular = item.CHLOC1T;
			}
		});
		res.status(HttpCodes.OK).json({ data: mostPopular });
	} catch (ex) {
		const err = `Failed to get most popular destination, Error: ${ex}`;
		logger.error(err);
		res.status(HttpCodes.ERROR).json({ message: err });
	}
};

export const getaway = async (req, res, next) => {
	try {
		let url = apiURL + `&filters={"CHLOCCT":"ISRAEL"}&fields=CHPTOL,CHLOCCT,CHOPER,CHFLTN,CHRMINE,CHCINT,CHCKZN` + sortByDate;
		const { data } = await axios.get(url);
		const outboundFlights = data.result?.records?.filter((record) => (record.CHCINT || record.CHCKZN) && new Date(record.CHPTOL).getTime() > new Date().getTime());
		if (!!outboundFlights?.length) {
			const departureFlight = outboundFlights[0];
			const inboundFlights = data.result?.records?.filter((record) => (!record.CHCINT || !record.CHCKZN) && new Date(record.CHPTOL).getTime() > new Date(departureFlight.CHPTOL).getTime());
			if (!!inboundFlights.length) {
				const arrivalFlight = inboundFlights[0];
				const departure = `${departureFlight.CHOPER}${departureFlight.CHFLTN}`;
				const arrival = `${arrivalFlight.CHOPER}${arrivalFlight.CHFLTN}`;
				return res.status(HttpCodes.OK).json({ data: { departure, arrival } });
			}
		}
		res.status(HttpCodes.OK).json({ data: 'none.' });
	} catch (ex) {
		const err = `Failed to get getaway, Error: ${ex}`;
		logger.error(err);
		res.status(HttpCodes.ERROR).json({ message: err });
	}
};
