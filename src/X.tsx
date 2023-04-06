import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

const X = () => {
  const handleSingin = (e) => {
    e.preventDefault()
    window.renderer.sendLoginMessage()
  }

  const handleSingout = (e) => {
    e.preventDefault()
    window.renderer.sendSignoutMessage()
  }

  const handleGet = (e) => {
    e.preventDefault()
  }


  useEffect(() => {
    window.renderer.onAuthResponse((authResponse) => {
      console.log('onAuthResponse', authResponse)
      Cookies.set('token', authResponse.accessToken)
    })
  }, [window.renderer])

  return <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand">Microsoft identity platform</a>
      <div className="btn-group ml-auto dropleft">
        <button type="button" id="signIn" className="btn btn-secondary" onClick={handleSingin}>
          Sign in
        </button>
        <button type="button" id="signOut" className="btn btn-success" onClick={handleSingout} >
          Sign out
        </button>
        <button type="button" id="signOut" className="btn btn-success" onClick={handleGet} >
          Get
        </button>
      </div>
    </nav>
  </div>
}

export default X
