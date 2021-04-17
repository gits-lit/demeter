import { Router, Request, Response } from 'express';
import { matchedData, validationResult, check } from 'express-validator';
import { ambeeDateParse } from 'src/utils/parseDate';
import { getAirQuality } from './ambee/airQuality';
import { getAirQualityHistory } from './ambee/airQualityHistory';
import { getFireLatest } from './ambee/fireLatest';
import { getPollenForecast } from './ambee/pollenForecast';
import { getPollenHistory } from './ambee/pollenHistory';
import { getSoilLatest } from './ambee/soilLatest';
import { getSoilHistory } from './ambee/soilHistory';
import { getWaterVaporHistory } from './ambee/waterVaporHistory';
import { getWaterVaporLatest } from './ambee/waterVaporLatest';
import { getWeatherForecast } from './ambee/weatherForecast';
import { getWeatherHistory } from './ambee/weatherHistory';
import { getWeatherLatest } from './ambee/weatherLatest';
import { getPollenLatest } from './ambee/pollenLatest';
import { USE_API } from 'src/configuration';
import exampleResponse from '../data/exampleResponse.json'

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!USE_API) {
        return res.json(exampleResponse)
    }

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
        let timeData: any = {};

        const airQuality = await getAirQuality(lat, lng);
        const fireLatest = await getFireLatest(lat, lng);
        const pollenForecast = await getPollenForecast(lat, lng);
        const soilLatest = await getSoilLatest(lat, lng);
        const waterVaporLatest = await getWaterVaporLatest(lat, lng);
        const weatherForecast = await getWeatherForecast(lat, lng);
        const weatherLatest = await getWeatherLatest(lat, lng);
        const pollenLatest = await getPollenLatest(lat, lng);

        if (usingTimes) {
            const airQualityHistory = await getAirQualityHistory(lat, lng, from, to);
            const pollenHistory = await getPollenHistory(lat, lng, from, to);
            const waterVaporHistory = await getWaterVaporHistory(lat, lng, from, to);
            const soilHistory = await getSoilHistory(lat, lng, from, to);
            const weatherHistory = await getWeatherHistory(lat, lng, from, to);
            timeData = { airQualityHistory, pollenHistory, waterVaporHistory, soilHistory, weatherHistory };
        }

        return res.json({
            lat,
            lng,
            insights: {
                current: {
                    airQuality,
                    fireLatest,
                    pollenForecast,
                    soilLatest,
                    waterVaporLatest,
                    weatherForecast,
                    weatherLatest,
                    pollenLatest,
                },
                time: {
                    ...timeData,
                },
            },
        });
    }
});

export default router;
