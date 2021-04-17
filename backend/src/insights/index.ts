import { Router, Request, Response } from 'express';
import { matchedData, validationResult, check } from 'express-validator';
import { ambeeDateParse } from 'src/utils/parseDate';
import { handleError } from 'src/utils/handleError';
import { getAirQuality } from './ambee/airQuality';
import { getAirQualityHistory } from './ambee/airQualityHistory';
import { getFireLatest } from './ambee/fireLatest';
import { getPollenForecast } from './ambee/pollenForecast';
import { getPollenHistory } from './ambee/pollenHistory';
import { getSoilLatest } from './ambee/soilLatest';
import { getSoilHistory } from './ambee/soilHistory';
import { getWeatherForecast } from './ambee/weatherForecast';
import { getWeatherHistory } from './ambee/weatherHistory';
import { getWeatherLatest } from './ambee/weatherLatest';
import { getPollenLatest } from './ambee/pollenLatest';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    await check('lat')
        .isFloat({ min: -90, max: 90 })
        .run(req);
    await check('lng')
        .isFloat({ min: -180, max: 180 })
        .run(req);
    await check('from')
        .isString()
        .optional({ checkFalsy: true })
        .run(req);
    await check('to')
        .isString()
        .optional({ checkFalsy: true })
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid Parameters',
            errors: errors.array(),
            parametersSent: req.body,
        });
    } else {
        // TODO: validate if we're doing timeline mode or not
        const { lat, lng }: { lat: number; lng: number } = req.body;
        let from: string, to: string;
        const usingTimes = !!req.body.from && !!req.body.to;
        if (usingTimes) {
            from = ambeeDateParse(from);
            to = ambeeDateParse(to);
        }

        const airQuality = await getAirQuality(lat, lng);
        const airQualityHistory = await getAirQualityHistory(lat, lng, from, to);
        const fireLatest = await getFireLatest(lat, lng);
        const pollenForecast = await getPollenForecast(lat, lng);
        const pollenHistory = await getPollenHistory(lat, lng, from, to);
        const soilLatest = await getSoilLatest(lat, lng);
        const soilHistory = await getSoilHistory(lat, lng, from, to);
        const weatherForecast = await getWeatherForecast(lat, lng);
        const weatherHistory = await getWeatherHistory(lat, lng, from, to);
        const weatherLatest = await getWeatherLatest(lat, lng);
        const pollenLatest = await getPollenLatest(lat, lng);

        return res.json({
            lat,
            lng,
            insights: {
                airQuality,
                airQualityHistory,
                fireLatest,
                pollenForecast,
                pollenHistory,
                soilLatest,
                soilHistory,
                weatherForecast,
                weatherHistory,
                weatherLatest,
                pollenLatest,
            },
        });
    }
});

export default router;
