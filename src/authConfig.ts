import { LogLevel } from '@azure/msal-node'


const AAD_ENDPOINT_HOST = 'https://login.microsoftonline.com/' // include the trailing slash

export const msalConfig = {
  auth: {
    clientId: '8cc74ecd-f86f-4dbf-8d49-daca3b6306a5',
    authority: `${AAD_ENDPOINT_HOST}c2a4f6b4-55e2-4b58-af2a-cc5c166f164b`,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message)
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose,
    },
  },
}

const GRAPH_ENDPOINT_HOST = 'https://graph.microsoft.com' // include the trailing slash

export const protectedResources = {
  graphMe: {
    endpoint: `${GRAPH_ENDPOINT_HOST}v1.0/me`,
    scopes: ['User.Read'],
  },
}

