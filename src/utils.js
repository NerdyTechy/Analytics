const mysql = require("mysql2");
const moment = require("moment");

const host = process.env.sql_host;
const port = process.env.sql_port;
const user = process.env.sql_user;
const pass = process.env.sql_pass;
const data = process.env.sql_data;

console.log(host);

const pool = mysql.createPool({
    connectionLimit: 100,
    host: host,
    port: port,
    user: user,
    password: pass,
    database: data
});

/**
 * Generate database table if it doesn't already exist.
 */
function initDatabase() {
    pool.query("CREATE TABLE IF NOT EXISTS `statistics` (`id` BIGINT NOT NULL AUTO_INCREMENT, `identifier` VARCHAR(64), `service` TINYTEXT, `launches` BIGINT, `lastLaunch` TIMESTAMP, PRIMARY KEY (`id`));");
}

/**
 * Adds a new Melody client to the database, or updates it if it already exists.
 * @param { String } identifier A SHA256 hash of the bot's client ID.
 */
function updateMelodyClient(identifier){
    initDatabase();
    pool.query(`SELECT * FROM statistics WHERE \`identifier\`="${identifier}";`, function (err, res) {
        if (!res || res.length != 1){
            pool.query(`INSERT INTO statistics (\`identifier\`, \`launches\`, \`service\`, \`lastLaunch\`) VALUES ("${identifier}", 1, "melody", "${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}")`);
        } else {
            pool.query(`UPDATE statistics SET \`launches\`=${res[0].launches + 1},\`service\`="melody",\`lastLaunch\`="${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}";`);
        }
    });
}

module.exports = {
    initDatabase: initDatabase,
    updateMelodyClient: updateMelodyClient
}