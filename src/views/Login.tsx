import React from "react";

export default function Login() {
    return (
        <html lang="en" data-bs-theme="dark">
            <head>
                <title>Login • Analytics</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
                <link href="/login.css" rel="stylesheet" />
            </head>
            <body className="d-flex align-items-center py-4 bg-body-tertiary">
                <main className="form-signin w-100 m-auto">
                    <form method="POST" action="/login">
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="username" placeholder="Username" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-check text-start my-3">
                            <input className="form-check-input" type="checkbox" value="remember-me" id="rememberme" />
                            <label className="form-check-label" htmlFor="rememberme">
                                Remember me
                            </label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">
                            Sign in
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
