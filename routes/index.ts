import { Router } from 'express';
import invoices from './invoices';
import sponsors from './sponsors';

const routes = Router();

routes.use('/invoices', invoices);
routes.use('/sponsors', sponsors);

export default routes;