import React from "react";

export default class Login extends React.Component {
    progress: number;

    constructor(props) {
        super(props);
        this.progress = 50;
    }

    render() {
        return (
            <html lang="en" data-bs-theme="dark">
                <head>
                    <title>Server Rebooting • Analytics</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
                    <link href="/setup.css" rel="stylesheet" />
                </head>
                <body className="d-flex align-items-center py-4 bg-body-tertiary">
                    <main className="form-setup w-100 m-auto">
                        <h1 className="h3 mb-3 fw-normal">Server Rebooting</h1>
                        <p>
                            The server process has exited. If your hosting supports automatic reboot, the server will be accessible shortly. Otherwise, you will need to manually restart the process. Once the server is back online, click{" "}
                            <a href="/login" target="_blank">
                                here
                            </a>{" "}
                            to login.
                        </p>
                        <p className="mt-5 mb-3 text-body-secondary">
                            Analytics software made by{" "}
                            <a href="https://github.com/NerdyTechy/Analytics" target="_blank" rel="noreferrer">
                                NerdyTechy
                            </a>
                            .
                        </p>
                    </main>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossOrigin="anonymous"></script>
                </body>
            </html>
        );
    }
}
