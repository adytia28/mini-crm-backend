import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDB, writeDB } from '../db/db';
import { isValidOrder } from '../utils/validate';
import { Order } from '../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!isValidOrder(data)) {
      res.status(400).json({ message: 'Invalid order data' });
    }

    const db = await readDB();
    const newOrder: Order = { id: uuidv4(), ...data,  created_at: new Date().toISOString() };
    db.orders.push(newOrder);
    await writeDB(db);

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getOrders(req: Request, res: Response) {
  try {
    const db = await readDB();
    const customerId = req.query.customer_id;

    if (customerId) {
      const filtered = db.orders.filter((o: Order) => o.customer_id === customerId);
      res.json(filtered);
    }

    res.json(db.orders);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
