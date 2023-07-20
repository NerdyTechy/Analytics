import React from "react";

export default class Login extends React.Component {
    progress: number;
    props: any;

    constructor(props) {
        super(props);
        this.progress = 100;
    }

    render() {
        return (
            <html lang="en" data-bs-theme="dark">
                <head>
                    <title>Setup • Analytics</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
                    <link href="/setup.css" rel="stylesheet" />
                </head>
                <body className="d-flex align-items-center py-4 bg-body-tertiary">
                    <main className="form-setup w-100 m-auto">
                        <form method="post" action="/setup/overview">
                            <h1 className="h3 mb-3 fw-normal">Setup Overview</h1>
                            <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={`${this.progress}`} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{ width: `${this.progress}%` }}>
                                    {this.progress}%
                                </div>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control top" id="admin-username" placeholder="Admin Username" readOnly={true} value={this.props.adminUsername} />
                                <label htmlFor="username">Admin Username</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control bottom" id="database-status" placeholder="Database Status" readOnly={true} value={"Successful"} />
                                <label htmlFor="database-status">Database Connection</label>
                            </div>
                            <p>The server now needs to reboot to apply the changes, and to disable the setup route.</p>
                            <button className="btn btn-danger w-100 py-2" type="submit">
                                Reboot Server
                            </button>
                            <p className="mt-5 mb-3 text-body-secondary">
                                Analytics software made by{" "}
                                <a href="https://github.com/NerdyTechy/Analytics" target="_blank" rel="noreferrer">
                                    NerdyTechy
                                </a>
                                .
                            </p>
                        </form>
                    </main>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossOrigin="anonymous"></script>
                </body>
            </html>
        );
    }
}
