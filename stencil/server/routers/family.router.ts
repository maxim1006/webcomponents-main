import * as express from 'express';
import {family} from "../mocks";


const familyRouter = express.Router();

familyRouter.post('/', (req, res) => {
    res.status(200).json(family[req.body.body.type]);
});

export {familyRouter};

