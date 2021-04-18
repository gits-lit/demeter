import express from 'express';
import bodyParser from 'body-parser';
import insightRouter from './insights';
import earthData from "./data/earthData.json"

export const getApp = () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/insight', insightRouter);
    app.get('/data/earth', (req, res) => {
        res.json(earthData)
    })

    return app;
};
