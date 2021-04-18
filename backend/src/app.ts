import express from 'express';
import cors from 'cors';
import insightRouter from './insights';
import earthData from "./data/earthData.json"

export const getApp = () => {
    const app = express();
    app.use(cors())
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/insight', insightRouter);
    app.get('/data/earth', (req, res) => {
        res.json(earthData)
    })

    return app;
};
