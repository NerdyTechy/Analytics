import * as dotenv from "dotenv";
import { init as initDb } from "./utils/database";
import express from "express";
import path from "path";
import { runConfigChecks } from "./data/configChecks";
import { createEngine } from "express-react-views";
import { isFirstTimeSetup } from "./utils/setupUtils";

import setupRoute from "./routes/setup";
import loginRoute from "./routes/login";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV == "dev";
const viewsFileExtension = dev ? "tsx" : "js";

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", viewsFileExtension);
app.engine(viewsFileExtension, createEngine());
app.disable("x-powered-by");
app.set("trust proxy", 1);

(async () => {
    if (await isFirstTimeSetup()) {
        app.use("/setup", setupRoute);
        app.all("/", (req, res) => res.redirect("/setup"));
    } else {
        runConfigChecks().then((success) => {
            if (!success) {
                console.log(`Your configuration is invalid. Please check that everything in ${path.join(__dirname, "data", "settings.json")} is correct, that the database is reachable, that an account with admin privileges exists.`);
                return process.exit(1);
            }

            initDb();

            app.use("/login", loginRoute);
        });
    }

    app.listen(PORT, () => console.log(`Running on port ${PORT}.`));
})();
