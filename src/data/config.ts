import fs from "fs";
import path from "path";
import { isFirstTimeSetup } from "../utils/setupUtils";

interface IConfig {
    database: {
        host: string;
        port: string | number;
        database: string;
        username: string;
        password: string;
    };
}

const config: Partial<IConfig> = {};

(async () => {
    if (!(await isFirstTimeSetup())) {
        const file = JSON.parse(fs.readFileSync(path.join(__dirname, "settings.json"), "utf-8"));

        config.database = {
            host: file.database.host,
            port: file.database.port,
            database: file.database.database,
            username: file.database.username,
            password: file.database.password,
        };
    }
})();

export default config;
