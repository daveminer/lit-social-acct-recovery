import { accountRecovery } from './accessControl'
import LitJsSdk from '@lit-protocol/sdk-browser'

class Lit {
  authSig = undefined
  chain = import.meta.env.VITE_CHAIN
  litNodeClient = new LitJsSdk.LitNodeClient()

  async connect() {
    console.log(this.chain, "CHAIN")
    await this.litNodeClient?.connect()
  }

  // Prove user ownership of wallet to Lit nodes; required before using other SDK actions.
  async getAuthSig() {
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: this.chain,
    })
    this.authSig = authSig

    return authSig
  }

  // Encrypt arbitrary text and the key used to encrypt it. Returns encrypted
  // version of both.
  async encrypt(text: string) {
    const accessControlConditions = accountRecovery()
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(text)

    const authSig = await this.getAuthSig()

    const symmKeyBytes = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: this.chain,
    })

    const encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
      symmKeyBytes,
      'base16'
    )

    return {
      encryptedString,
      encryptedSymmetricKey,
      accessControlConditions
    }
  }

  // Decrypt an encryptedString by providing the encryptedSymmetricKey and
  // passing the accessControlConditions.
  async decrypt(encryptedString: string, encryptedSymmetricKey: string) {
    if (!this.litNodeClient) {
      await this.connect()
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: this.chain,
    })

    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: accountRecovery(),
      toDecrypt: encryptedSymmetricKey,
      chain: this.chain,
      authSig,
    })

    const decryptedString = await LitJsSdk.decryptString(
      encryptedString,
      symmetricKey
    )

    return { decryptedString }
  }
}

export default new Lit()
