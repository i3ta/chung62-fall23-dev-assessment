import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from './database.js';

function parseQuery (queryString) {
    console.log(`Query: ${queryString}`);
    var query = {};
    var pairs = queryString.split('&');
    for (var i = 0; i < pairs.length;  i++) {
        var pair = pairs.split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return query;
}

export default function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            if(JSON.stringify(req.query) !== JSON.stringify({})) {
                console.log(req.query);
                const query = parseQuery(req.query);
                res.status(200).json(database[parseInt(query['id']) + 1]); // id starts from 1
            } else {
                res.status(200).json(database);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occured' });
        }
    } else {
        // Method not allowed
        res.status(405).json({ message: 'Method not allowed' });
    }
}