const { Router } = require('express');
const invoices = require('./invoices');

const routes = Router();

routes.use('/invoices', invoices);

module.exports = routes;