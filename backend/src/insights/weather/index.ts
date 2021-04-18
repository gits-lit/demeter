import axios from 'axios';
import { Router, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { WEATHER_API_KEY } from 'src/configuration';
import { weatherDateParse } from 'src/utils/parseDate';

const router = Router();
router.get('/', async (req: Request, res: Response) => {
    await check('date')
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
        let from: string, to: string;
        const usingTimes = !!req.body.from && !!req.body.to;
        if (usingTimes) {
            from = weatherDateParse(from);
            to = weatherDateParse(to);
        }

        const result = await getWeatherForecast(from, to);
        return res.json({
            from,
            to, 
            weather: result
        });
    }
    
});

interface WeatherForecast {
    date: string; 
    max_temp_high: number; 
    max_temp_low: number; 
    min_temp_code: string; 
    min_temp_high: number; 
    min_temp_low: number; 
    precipitation: string;
    precipitation_code: string; 
    temp: string;
    temp_code: string; 
}

interface WeatherResponse {
    status: string;
    error?: any,
    location?: string;
    forecast?: WeatherForecast[];
}

const getWeatherForecast = async (from: string, to: string): Promise<WeatherResponse> => {
    
    try {
        const response = await axios.request({
            url: `https://weatherplanner.azure-api.net/v1/Forecast/Des Moines/${from}/${to}`,
            params: { 'subscription-key': WEATHER_API_KEY },
            headers: { 'Content-type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        return {
            status: 'failed',
            error: error
        };
    }
};

export default router;