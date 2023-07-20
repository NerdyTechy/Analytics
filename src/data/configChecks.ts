import config from "./config";
import sql from "mysql2";
import { isFirstTimeSetup } from "../utils/setupUtils";

const isDatabaseReachable = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const conn = sql.createConnection({
            host: config.database.host,
            port: parseInt(String(config.database.port)),
            user: config.database.username,
            password: config.database.password,
            database: config.database.database,
        });

        conn.connect((err) => {
            if (err) resolve(false);
            if (conn) conn.end();
            resolve(true);
        });
    });
};

const doesAdminAccountExist = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const conn = sql.createConnection({
            host: config.database.host,
            port: parseInt(String(config.database.port)),
            user: config.database.username,
            password: config.database.password,
            database: config.database.database,
        });

        conn.connect(async (err) => {
            if (err) {
                return resolve(false);
            }

            const data: any = (await conn.promise().query("SHOW TABLES LIKE 'users';"))[0];

            if (data.length === 0) {
                if (conn) conn.end();
                return resolve(false);
            }

            const accounts: any = (await conn.promise().query("SELECT * FROM users WHERE admin=1;"))[0];

            if (conn) conn.end();

            if (accounts.length === 0) return resolve(false);
            return resolve(true);
        });
    });
};

export async function runConfigChecks(): Promise<boolean> {
    if (isFirstTimeSetup()) return true;

    if (!(await isDatabaseReachable())) return false;
    if (!(await doesAdminAccountExist())) return false;
    return true;
}
