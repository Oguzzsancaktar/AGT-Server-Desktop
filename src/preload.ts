import { contextBridge, ipcRenderer } from 'electron'

/**
 * This preload script exposes a "renderer" API to give
 * the Renderer process controlled access to some Node APIs
 * by leveraging IPC channels that have been configured for
 * communication between the Main and Renderer processes.
 */

contextBridge.exposeInMainWorld('renderer', {
  sendLoginMessage: () => {
    ipcRenderer.send('LOGIN')
  },
  sendSignoutMessage: () => {
    ipcRenderer.send('LOGOUT')
  },
  onAuthResponse: (callback: (authResponse: any) => void) => {
    ipcRenderer.on('SEND_AUTH_RESPONSE', (event, authResponse) => {
      console.log("authResponse from preload", authResponse);
      callback(authResponse)
    })
  },
})
