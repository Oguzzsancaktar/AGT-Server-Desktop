export { };

interface IRenderer {
  sendLoginMessage: () => void,
  sendSignoutMessage: () => void,
  sendGetLoggedAccountMessage: () => void,
  getLoggedAccount: (callback: (account: any) => void) => void,
  onAuthResponse: (callback: (authResponse: any) => void) => void,
}

declare global {
  interface Window {
    renderer: IRenderer;
  }
}
