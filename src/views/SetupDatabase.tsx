import React from "react";

export default class Login extends React.Component {
    progress: number;
    props: any;

    constructor(props) {
        super(props);
        this.progress = 0;
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
                        {this.props.error ? (
                            <div className="alert alert-danger" role="alert">
                                An error occurred whilst connecting to the database:
                                <br />
                                <br />
                                {this.props.error}
                            </div>
                        ) : null}
                        <form method="post" action="/setup/database">
                            <h1 className="h3 mb-3 fw-normal">Database Setup</h1>
                            <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={`${this.progress}`} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{ width: `${this.progress}%` }}>
                                    {this.progress}%
                                </div>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control top" id="host" name="host" placeholder="Database Host" required={true} spellCheck={false} defaultValue={this.props.host ?? ""} />
                                <label htmlFor="host">Database Host</label>
                            </div>
                            <div className="form-floating">
                                <input type="number" className="form-control" id="port" name="port" placeholder="Database Port" required={true} spellCheck={false} defaultValue={this.props.port ? parseInt(this.props.port) : ""} />
                                <label htmlFor="port">Database Port</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="name" name="name" placeholder="Database Name" required={true} spellCheck={false} defaultValue={this.props.name ?? ""} />
                                <label htmlFor="name">Database Name</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="username" name="user" placeholder="Database Username" required={true} spellCheck={false} defaultValue={this.props.user ?? ""} />
                                <label htmlFor="username">Database Username</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control bottom" id="password" name="pass" placeholder="Database Password" spellCheck={false} />
                                <label htmlFor="password">Database Password</label>
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit">
                                Next
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
