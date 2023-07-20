import express from "express";
import sql from "mysql2";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { init as initDb } from "../utils/database";

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/setup/database");
});

router.get("/database", (req, res) => {
    if (fs.existsSync(path.join(__dirname, "..", "data", "settings.json"))) {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "settings.json"), "utf-8"));
        if (data && data.database) {
            if (testDatabaseConnection(data.database.host, data.database.port, data.database.database, data.database.username, data.database.password)) {
                return res.redirect("/setup/user");
            }
        }
    }

    res.render("SetupDatabase", {
        error: req.query && req.query.error ? req.query.error : null,
        host: req.query && req.query.host ? req.query.host : null,
        port: req.query && req.query.port ? req.query.port : null,
        name: req.query && req.query.name ? req.query.name : null,
        user: req.query && req.query.user ? req.query.user : null,
    });
});

router.get("/user", async (req, res) => {
    // if (!fs.existsSync(path.join(__dirname, '..', 'data', 'settings.json'))) return res.redirect('/setup/database');
    res.render("SetupUser");
});

router.get("/overview", (req, res) => {
    if (!fs.existsSync(path.join(__dirname, "..", "data", "settings.json"))) return res.redirect("/setup/database");

    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "settings.json"), "utf-8"));

    const conn = sql.createConnection({
        host: data.database.host,
        port: data.database.port,
        user: data.database.username,
        password: data.database.password,
        database: data.database.database,
    });

    let adminUsername = "Error whilst fetching admin username";

    conn.connect(async (err) => {
        if (err) {
            throw new Error(err.message);
        }

        const data: any = (await conn.promise().query("SELECT * FROM users WHERE admin=1;"))[0];
        adminUsername = data[0].username;
        if (conn) conn.end();
        res.render("SetupOverview", { adminUsername: adminUsername });
    });
});

router.post("/database", express.urlencoded({ extended: false }), (req, res) => {
    const { host, port, name, user, pass } = req.body;

    testDatabaseConnection(host, port, name, user, pass)
        .then(() => {
            const data = {
                database: {
                    host: host,
                    port: port,
                    database: name,
                    username: user,
                    password: pass,
                },
            };

            fs.writeFileSync(path.join(__dirname, "..", "data", "settings.json"), JSON.stringify(data));

            initDb();

            res.redirect("/setup/user");
        })
        .catch((e) => {
            res.redirect(`/setup/database?error=${e}&host=${host}&port=${port}&name=${name}&user=${user}`);
        });
});

router.post("/user", express.urlencoded({ extended: false }), (req, res) => {
    const { username, password } = req.body;

    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "settings.json"), "utf-8"));

    const conn = sql.createConnection({
        host: data.database.host,
        port: data.database.port,
        user: data.database.username,
        password: data.database.password,
        database: data.database.database,
    });

    conn.connect(async (err) => {
        if (err) {
            throw new Error(err.message);
        }

        const hash = bcrypt.hashSync(password, 10);
        await conn.promise().query("CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL AUTO_INCREMENT, `username` VARCHAR(30), `admin` BOOLEAN NOT NULL DEFAULT '0', `password` CHAR(60) BINARY NOT NULL, PRIMARY KEY (`id`));");
        await conn.promise().query("INSERT INTO users(username, admin, password) VALUES (?, ?, ?);", [username, 1, hash]);
        if (conn) conn.end();
        res.redirect("/setup/overview");
    });
});

router.post("/overview", (req, res) => {
    res.render("Rebooting");
    process.exit(0);
});

const testDatabaseConnection = (host: string, port: number, name: string, user: string, pass: string): Promise<Error | boolean> => {
    return new Promise((resolve, reject) => {
        const conn = sql.createConnection({
            host: host,
            port: port,
            user: user,
            password: pass,
            database: name,
        });

        conn.connect((err) => {
            if (err) return reject(err);
            if (conn) conn.end();
            resolve(true);
        });
    });
};

export default router;
