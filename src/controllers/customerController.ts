import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDB, writeDB } from '../db/db';
import { isValidCustomer } from '../utils/validate';
import { Customer } from '../models/Customer';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!isValidCustomer(data)) {
      res.status(400).json({ message: 'Invalid order data' });
    }

    const db = await readDB();

     // Cek email dan phone sudah ada atau belum
    const emailExists = db.customers.some(
      (customer: Customer) => customer.email === data.email
    );

    const phoneExists = db.customers.some(
      (customer: Customer) => customer.phone === data.phone
    );

    if (emailExists && phoneExists) {
      return res.status(409).json({ message: 'Email and phone number sudah terdaftar' });
    } else if (emailExists) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    } else if (phoneExists) {
      return res.status(409).json({ message: 'Phone number sudah terdaftar' });
    }

    const newCustomer: Customer = { id: uuidv4(), ...data,  created_at: new Date().toISOString() };
    db.customers.push(newCustomer);
    await writeDB(db);

    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const db = await readDB();
    res.json(db.customers);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

