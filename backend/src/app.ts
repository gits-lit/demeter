import express from 'express';
import bodyParser from 'body-parser';
import insightRouter from './insights';

export const getApp = () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/insight', insightRouter);

    return app;
};
