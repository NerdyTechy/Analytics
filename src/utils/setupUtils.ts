import fs from "fs";
import path from "path";
import sql from "mysql2";

export async function isFirstTimeSetup(): Promise<boolean> {
    if (!fs.existsSync(path.join(__dirname, "..", "data", "settings.json"))) return true;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "settings.json"), "utf-8"));
    if (!data || !data.database) return true;
    if (!(await doesAdminAccountExist(data.database.host, data.database.port, data.database.username, data.database.password, data.database.database))) return true;
    return false;
}

const doesAdminAccountExist = (host: string, port: number, user: string, password: string, database: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const conn = sql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database,
        });

        conn.connect(async (err) => {
            if (err) return resolve(false);

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
