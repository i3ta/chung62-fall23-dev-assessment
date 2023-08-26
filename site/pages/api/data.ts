import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from './database.js';

export default function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            res.status(200).json(database);
        } catch (error) {
            res.status(500).json({ error: 'An error occured' });
        }
    } else if (req.method === 'POST') {
        try {
            const request = JSON.parse(req.body);
            if (request['type'] === 'DELETE') {
                console.log(`delete id ${request['id']}`);
            }
            res.status(200).json({ message: 'Updated database' });
        } catch (error) {
            res.status(500).json({ error: 'An error occured' });
        }
    } else {
        // Method not allowed
        res.status(405).json({ message: 'Method not allowed' });
    }
}