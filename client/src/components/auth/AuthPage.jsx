'use client'

import { useState } from 'react'
import { FaEnvelope, FaLock, FaPlane, FaUser } from 'react-icons/fa'
import API from '@/utils/api'
import { saveAuthSession } from './authSession'
import './AuthPage.css'

export default function AuthPage({ onAuthenticated }) {
  const [authMode, setAuthMode] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    const endpoint = authMode === 'login'
      ? '/api/auth/login'
      : '/api/auth/register'

    const payload = authMode === 'login'
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password }

    try {
      const response = await API.post(endpoint, payload)

      saveAuthSession({
        token: response.data?.token,
        email: formData.email
      })

      onAuthenticated?.({ email: formData.email })
      setFormData({ name: '', email: '', password: '' })
    } catch (err) {
      const serverMessage = err.response?.data?.message
      setAuthError(serverMessage || err.message || 'Invalid email or password.')
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-shell">
        <div className="auth-art" aria-hidden="true">
          <div className="auth-plane-route">
            <span className="auth-plane"><FaPlane /></span>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-switch" aria-label="Authentication mode">
            <button
              type="button"
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => { setAuthMode('login'); setAuthError('') }}
            >
              Login
            </button>
            <button
              type="button"
              className={authMode === 'signup' ? 'active' : ''}
              onClick={() => { setAuthMode('signup'); setAuthError('') }}
            >
              Sign Up
            </button>
          </div>

          <h1 className="auth-title">
            {authMode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>

          {authError && <div className="auth-error">{authError}</div>}

          <form onSubmit={handleAuthSubmit} className="auth-form">
            {authMode === 'signup' && (
              <div className="auth-field">
                <label>Full Name</label>
                <div className="auth-input-wrap">
                  <FaUser />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={authLoading} className="auth-submit">
              {authLoading ? 'Verifying...' : authMode === 'login' ? 'Sign In' : 'Register Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
