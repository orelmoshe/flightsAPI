import express from 'express';
import * as statsController from '../controllers/flightStats';

const router = express.Router();

router.get('/total', statsController.totalFlights);
router.get('/inbound', statsController.totalInboundFlights);
router.get('/outbound', statsController.totalOutboundFlights);
router.get('/delayed', statsController.totalDelays);
router.get('/popular', statsController.mostPopularDestination);
router.get('/getaway', statsController.getaway);

export default router;
