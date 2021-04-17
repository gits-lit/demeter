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
import exampleResponse from '../data/perfectResponse.json';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!USE_API) {
        return res.json(exampleResponse);
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

    const endpoints = [
        {
            name: 'airQuality',
            api: getAirQuality,
        },
        {
            name: 'airQualityHistory',
            api: getAirQualityHistory,
        },
        {
            name: 'fireLatest',
            api: getFireLatest,
        },
        {
            name: 'pollenForecast',
            api: getPollenForecast,
        },
        {
            name: 'pollenHistory',
            api: getPollenHistory,
        },
        {
            name: 'soilLatest',
            api: getSoilLatest,
        },
        {
            name: 'soilHistory',
            api: getSoilHistory,
        },
        {
            name: 'waterVaporHistory',
            api: getWaterVaporHistory,
        },
        {
            name: 'waterVaporLatest',
            api: getWaterVaporLatest,
        },
        {
            name: 'weatherForecast',
            api: getWeatherForecast,
        },
        {
            name: 'weatherHistory',
            api: getWeatherHistory,
        },
        {
            name: 'weatherLatest',
            api: getWeatherLatest,
        },
        {
            name: 'pollenLatest',
            api: getPollenLatest,
        },
    ];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid Parameters',
            errors: errors.array(),
            parametersSent: req.body,
        });
    } else {
        const { lat, lng }: { lat: number; lng: number } = req.body;
        let from: string, to: string;
        const usingTimes = !!req.body.from && !!req.body.to;
        if (usingTimes) {
            from = ambeeDateParse(from);
            to = ambeeDateParse(to);
        }

        let data: any = {};

        for (const endpoint of endpoints) {
            if (req.body[endpoint.name] == 'API') {
                console.log(`requesting ${endpoint.name} using the api`)
                const result = await endpoint.api(lat, lng, from, to)
                const success = !result.error
                if (success) {
                    data[endpoint.name] = result;
                    continue;
                } else {
                    console.log(`request for ${endpoint.name} failed — using cache`)
                }       
            }
            console.log(`using cached data from ${endpoint.name}`)
            data[endpoint.name] = (exampleResponse.insights as any)[endpoint.name]
        }
        return res.json({
            lat,
            lng,
            insights: data
        });
    }
});

export default router;
