const { Router } = require('express');
const invoices = require('./invoices');
const sponsors = require('./sponsors');

const routes = Router();

routes.use('/invoices', invoices);
routes.use('/sponsors', sponsors);

module.exports = routes;