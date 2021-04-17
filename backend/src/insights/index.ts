import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { handleError } from 'src/utils/handleError';
import { getAirQuality } from './ambee/airQuality';

const router = Router();

router.get('/', body('lat').isNumeric(), body('lng').isNumeric(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid Parameters',
            errors: errors.array(),
        });
    } else {
        const { lat, lng }: { lat: number; lng: number } = req.body;

        const airQuality = await getAirQuality(lat, lng);

        if (airQuality.error) {
            return handleError('Air Quality Failed', airQuality.error, req, res);
        }

        return res.json({
            lat,
            lng,
            airQuality,
        });
    }
});

export default router;
