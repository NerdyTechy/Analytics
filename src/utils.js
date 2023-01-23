var mysql = require("mysql2");
var moment = require("moment");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.sql_host,
    port: process.env.sql_port,
    user: process.env.sql_user,
    password: process.env.sql_pass,
    database: process.env.sql_data
});

/**
 * Generate database table if it doesn't already exist.
 */
function initDatabase() { pool.query("CREATE TABLE IF NOT EXISTS `statistics` (`id` BIGINT NOT NULL AUTO_INCREMENT, `identifier` VARCHAR(64), `service` TINYTEXT, `initialService` TINYTEXT, `launches` BIGINT, `lastLaunch` TIMESTAMP, PRIMARY KEY (`id`));"); }

/**
 * Adds a new Melody client to the database, or updates it if it already exists.
 * @param { String } identifier A SHA256 hash of the bot's client ID.
 */
function updateMelodyClient(identifier){
    initDatabase();
    pool.query(`SELECT * FROM statistics WHERE \`identifier\`=${pool.escape(identifier)};`, function (err, res) {
        if (!res || res.length != 1){
            pool.query(`INSERT INTO statistics (\`identifier\`, \`launches\`, \`service\`, \`initialService\`, \`lastLaunch\`) VALUES (${pool.escape(identifier)}, 1, "melody", "melody", "${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}")`);
        } else {
            pool.query(`UPDATE statistics SET \`launches\`=${res[0].launches + 1},\`service\`="melody",\`lastLaunch\`="${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}" WHERE \`identifier\`=${pool.escape(identifier)};`);
        }
    });
}

module.exports = {
    initDatabase: initDatabase,
    updateMelodyClient: updateMelodyClient
};