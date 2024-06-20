
import express from "express";
import routes from "./routes";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware";
import createInvoiceSheet from "./utils/createInvoiceSheet.ts";

const app = express();

app.use(cors());

app.use(authMiddleware);

app.use(express.json());

app.use(routes);

app.get('/', (_, res) => { res.send('success') });

const port = 4000;

createInvoiceSheet();

app.listen(port, () => console.log("listening on port " + port));

export default app;