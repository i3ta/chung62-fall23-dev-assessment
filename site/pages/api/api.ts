import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from './database.js';

export default function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            res.status(200).json(database);
        } catch (error) {
            res.status(500).json({ error: 'An error occured' });
        }
    } else {
        // Method not allowed
        res.status(405).json({ message: 'Method not allowed' });
    }
}