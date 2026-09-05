import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Logo from '../../../components/Logo'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await handleLogin({ email, password })
        if (user) {
            navigate("/", { replace: true })
        }
    }

    if (loading) {
        return (
            <main className="auth-main">
                <div className="auth-loading">
                    <div className="spinner"></div>
                    <h2>Loading...</h2>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-main">
            <div className="auth-card">
                {/* Left Banner Panel */}
                <div className="auth-banner">
                    <div className="banner-content">
                        <div className="brand-logo-wrapper" style={{ marginBottom: '1.75rem' }}>
                            <Logo variant="banner" size="large" />
                        </div>
                        <h2 className="banner-title">Welcome Back!</h2>
                        <p className="banner-subtitle">
                            To stay connected with us please login with your personal info
                        </p>
                        <Link to="/register" className="banner-btn">
                            SIGN UP
                        </Link>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="auth-form-section">
                    <div className="form-header">
                        <h1 className="form-title">welcome</h1>
                        <p className="form-subtitle">Login in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email............"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password............"
                                required
                            />
                        </div>

                        <div className="form-options">
                            <a href="#forgot" onClick={(e) => e.preventDefault()} className="forgot-password">
                                Forgot your password?
                            </a>
                        </div>

                        <button type="submit" className="submit-btn">
                            LOG IN
                        </button>
                    </form>

                    <p className="switch-auth">
                        Don't have an account? <Link to="/register">sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login