import sql from "mysql2";
import moment from "moment";
import config from "../data/config";

let pool: sql.Pool;

/**
 * Create database table if it doesn't already exist
 */
export function init() {
    pool = sql.createPool({
        connectionLimit: 100,
        host: config.database.host,
        port: parseInt(String(config.database.port)),
        user: config.database.username,
        password: config.database.password,
        database: config.database.database,
    });

    pool.query("CREATE TABLE IF NOT EXISTS `statistics` (`id` BIGINT NOT NULL AUTO_INCREMENT, `identifier` VARCHAR(64), `service` TINYTEXT, `initialService` TINYTEXT, `launches` BIGINT, `lastLaunch` TIMESTAMP, PRIMARY KEY (`id`));");
    pool.query("CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL AUTO_INCREMENT, `username` VARCHAR(30), `admin` BOOLEAN NOT NULL DEFAULT '0', `password` CHAR(60) BINARY NOT NULL, PRIMARY KEY (`id`));");
}

/**
 * Adds a new Melody client to the database, or updates it if it already exists.
 * @param { String } identifier A SHA256 hash of the bot's client ID.
 */
export async function updateMelodyClient(identifier) {
    const data = await query("SELECT * FROM statistics WHERE identifier=?;", [identifier]);
    if (!data || data.length !== 1) {
        pool.query("INSERT INTO statistics (identifier, launches, service, initialService, lastLaunch) VALUES (?, ?, ?, ?, ?);", [identifier, 1, "melody", "melody", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]);
    } else {
        pool.query("UPDATE statistics SET launches=?, service=?, lastLaunch=? WHERE identifier=?;", [data[0].launches + 1, "melody", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), identifier]);
    }
}

export async function query(sql: string, data?: string[], cb?: (err: Error) => void) {
    let results;
    await pool
        .promise()
        .query(sql, data)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .then((res, err) => {
            if (err) {
                if (cb) return cb(err);
                else throw new Error(err);
            }
            results = res;
        })
        .catch((err) => {
            if (cb) return cb(err);
            else throw new Error(err);
        });
    return results[0];
}

export function getPool(): sql.Pool {
    return pool;
}
