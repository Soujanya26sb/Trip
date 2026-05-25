export const getInitialAuthSession = () => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null }
  }

  const loggedInStatus = sessionStorage.getItem('trip_user_logged_in')
  const savedEmail = sessionStorage.getItem('trip_user_email')

  if (loggedInStatus === 'true' && savedEmail) {
    return { isAuthenticated: true, user: { email: savedEmail } }
  }

  return { isAuthenticated: false, user: null }
}

export const saveAuthSession = ({ token, email }) => {
  if (token) {
    sessionStorage.setItem('token', token)
  }

  sessionStorage.setItem('trip_user_logged_in', 'true')
  sessionStorage.setItem('trip_user_email', email)
}

export const clearAuthSession = () => {
  sessionStorage.clear()
}
