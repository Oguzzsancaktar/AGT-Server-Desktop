import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-node'
import { shell } from 'electron'

export class AuthProvider {
  msalConfig
  clientApplication
  account: any
  cache

  constructor(msalConfig: any) {
    this.msalConfig = msalConfig
    this.clientApplication = new PublicClientApplication(this.msalConfig)
    this.cache = this.clientApplication.getTokenCache()
    this.account = null
  }

  async login() {
    const authResponse = await this.getToken({
      scopes: ["https://management.azure.com/user_impersonation", "offline_access", "user.read"],
    })

    return this.handleResponse(authResponse)
  }

  async logout() {
    if (!this.account) return

    try {
      if (this.account.idTokenClaims.hasOwnProperty('login_hint')) {
        await shell.openExternal(`${this.msalConfig.auth.authority}/oauth2/v2.0/logout?logout_hint=${encodeURIComponent(this.account.idTokenClaims.login_hint)}`)
      }

      await this.cache.removeAccount(this.account)
      this.account = null
    } catch (error) {
      console.log(error)
    }
  }

  async getToken(tokenRequest: any) {
    let authResponse
    const account = this.account || (await this.getAccount())

    if (account) {
      tokenRequest.account = account
      authResponse = await this.getTokenSilent(tokenRequest)
    } else {
      authResponse = await this.getTokenInteractive(tokenRequest)
    }

    return authResponse || null
  }

  async getTokenSilent(tokenRequest: any) {
    try {
      return await this.clientApplication.acquireTokenSilent(tokenRequest)
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        console.log('Silent token acquisition failed, acquiring token interactive')
        return await this.getTokenInteractive(tokenRequest)
      }

      console.log(error)
    }
  }

  async getTokenInteractive(tokenRequest: any) {
    try {
      const openBrowser = async (url: any) => {
        await shell.openExternal(url)
      }

      const authResponse = await this.clientApplication.acquireTokenInteractive({
        ...tokenRequest,
        openBrowser,
        successTemplate: '<h1>Successfully signed in!</h1> <p>You can close this window now.</p>',
        errorTemplate: '<h1>Oops! Something went wrong</h1> <p>Check the console for more information.</p>',
      })

      return authResponse
    } catch (error) {
      throw error
    }
  }

  /**
   * Handles the response from a popup or redirect. If response is null, will check if we have any accounts and attempt to sign in.
   * @param response
   */
  async handleResponse(response: any) {
    if (response !== null) {
      this.account = response.account
    } else {
      this.account = await this.getAccount()
    }

    return response
  }
  async getAccount() {
    const currentAccounts = await this.cache.getAllAccounts()

    if (!currentAccounts) {
      console.log('No accounts detected')
      return null
    }

    if (currentAccounts.length > 1) {
      // Add choose account code here
      console.log('Multiple accounts detected, need to add choose account code.')
      return currentAccounts[0]
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0]
    } else {
      return null
    }
  }

  async getAccessToken() {
    const authResponse = await this.getToken({
      scopes: this.msalConfig.auth.clientId,
    })

    return authResponse.accessToken
  }
}







