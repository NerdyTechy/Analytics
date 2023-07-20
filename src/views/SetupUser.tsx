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
                    <title>Setup • Analytics</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
                    <link href="/setup.css" rel="stylesheet" />
                </head>
                <body className="d-flex align-items-center py-4 bg-body-tertiary">
                    <main className="form-setup w-100 m-auto">
                        <form method="post" action="/setup/user" id="user-form">
                            <h1 className="h3 mb-3 fw-normal">Admin User Setup</h1>
                            <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={`${this.progress}`} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{ width: `${this.progress}%` }}>
                                    {this.progress}%
                                </div>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control top" id="username" placeholder="Username" name="username" required={true} spellCheck={false} maxLength={30} />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="password" placeholder="Password" name="password" required={true} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control bottom" id="confirm-password" placeholder="Confirm Password" required={true} />
                                <label htmlFor="confirm-password">Confirm Password</label>
                            </div>
                            <p id="message"></p>
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
                    <script
                        dangerouslySetInnerHTML={{
                            __html: "function check(){return document.getElementById(\"password\").value==document.getElementById(\"confirm-password\").value?(document.getElementById(\"message\").style.color=\"green\",document.getElementById(\"message\").innerHTML=\"Passwords match\",!0):(document.getElementById(\"message\").style.color=\"red\",document.getElementById(\"message\").innerHTML=\"Passwords do not match\",!1)}document.getElementById(\"password\").addEventListener(\"input\",()=>{check()}),document.getElementById(\"confirm-password\").addEventListener(\"input\",()=>{check()}),document.getElementById(\"user-form\").addEventListener(\"submit\",e=>{check()||e.preventDefault()});",
                        }}
                    ></script>
                </body>
            </html>
        );
    }
}
