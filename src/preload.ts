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
  sendGetLoggedAccountMessage: () => {
    ipcRenderer.send('GET_LOGGED_ACCOUNT')
  },
  getLoggedAccount: (callback: (account: any) => void) => {
    ipcRenderer.on('TRIGGER_GET_LOGGED_ACCOUNT', (event, account) => {
      callback(account)
    })
  },
  onAuthResponse: (callback: (authResponse: any) => void) => {
    ipcRenderer.on('SEND_AUTH_RESPONSE', (event, authResponse) => {
      callback(authResponse)
    })
  },
})
