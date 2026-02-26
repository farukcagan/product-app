'use client';

import { useState } from 'react';
import { CONTENT } from '../constants/content';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="login-section">
            <div className="login-card">
                <div className="login-card-header">
                    <h2>{CONTENT.login.welcome}</h2>
                    <p className="subtitle">{CONTENT.login.subtitle}</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">{CONTENT.login.emailLabel}</label>
                        <input
                            type="email"
                            id="email"
                            placeholder={CONTENT.login.emailPlaceholder}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">{CONTENT.login.passwordLabel}</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder={CONTENT.login.passwordPlaceholder}
                                className="form-input"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {/* SVG for visibility toggle */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {showPassword ? (
                                        <>
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    <label className="remember-me">
                        <input type="checkbox" />
                        <span>{CONTENT.login.rememberMe}</span>
                    </label>

                    <button type="submit" className="login-button">
                        {CONTENT.login.buttonText}
                    </button>
                </form>
            </div>
        </section>
    );
};
