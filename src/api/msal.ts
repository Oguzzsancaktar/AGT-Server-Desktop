import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: '5ff15a1c-f17a-4693-bc6b-4fbd5d7d3000', // Microsoft uygulama kimliği
    authority: 'https://login.microsoftonline.com/common', // Kimlik doğrulama sağlayıcısı
    redirectUri: 'http://localhost:3000', // Yönlendirme URI'si
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

async function signIn() {
  try {
    await msalInstance.loginPopup();
    const accessToken = await msalInstance.acquireTokenSilent({
      scopes: ['user.read'],
    });
    console.log(accessToken.accessToken);
  } catch (error) {
    console.log(error);
  }
}

export default signIn;
