
import express from "express";
import routes from "./routes";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware";

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(authMiddleware);

app.use(express.json());

app.use(routes);

app.get('/', (_, res) => { res.send('success') });

const port = 4000;


app.listen(port, () => console.log("listening on port " + port));

export default app;