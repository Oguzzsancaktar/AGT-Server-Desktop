import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

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
    console.log("Cookies.get('accessToken')", Cookies.get('accessToken'));
  }


  useEffect(() => {
    window.renderer.onAuthResponse((authResponse) => {
      console.log('onAuthResponse', authResponse)
      Cookies.set('accessToken', authResponse.accessToken)
    })
  }, [window.renderer])

  return <div>
    <button onClick={handleSingin}>
      Sign in
    </button>
    <button onClick={handleSingout} >
      Sign out
    </button>
    <button onClick={handleGet} >
      Get
    </button>
  </div>
}

export default X
