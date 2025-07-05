import express from 'express';
import cors from 'cors';

import customerRoutes from './routes/customerRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});