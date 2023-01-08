import AccessControl from './AccessControl'
import LitJsSdk from '@lit-protocol/sdk-browser'

class Lit {
  authSig = undefined
  chain = process.env.REACT_APP_CHAIN
  litNodeClient = undefined

  async connect() {
    this.litNodeClient = new LitJsSdk.LitNodeClient()
    await this.litNodeClient.connect()
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
  async encrypt(text) {
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(text)

    const authSig = await this.getAuthSig()

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions: AccessControl.default,
      symmetricKey,
      authSig,
      chain: this.chain,
    })

    return {
      encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        'base16'
      ),
    }
  }

  // Decrypt an encryptedString by providing the encryptedSymmetricKey and
  // passing the accessControlConditions.
  async decrypt(encryptedString, encryptedSymmetricKey) {
    if (!this.litNodeClient) {
      await this.connect()
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: this.chain,
    })

    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: AccessControl.default,
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
