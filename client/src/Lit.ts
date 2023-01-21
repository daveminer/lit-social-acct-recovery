import { accountRecovery } from "./accessControl"
import LitJsSdk, { LitNodeClient } from "@lit-protocol/sdk-browser"

interface LitNodeKeys {
  serverPubKey: string
  subnetPubKey: string
  networkPubKey: string
  networkPubKeySet: string[]
}

interface LitNodeClient {
  config: object
  connect: Function
  connectedNodes: string[]
  getEncryptionKey: Function
  ready: boolean
  networkPubKey: string
  networkPubKeySet: string[]
  serverKeys: LitNodeKeys
  saveEncryptionKey: Function
  subnetPubKey: string
}

interface EncryptionResult {
  data: string
  symmetricKey: EncryptedSymmetricKey
}

interface EncryptedSymmetricKey {
  accessControlConditions: object[]
  encryptedSymmetricKey: string
}

class Lit {
  chain: string = import.meta.env.VITE_CHAIN
  litNodeClient: LitNodeClient = new LitJsSdk.LitNodeClient()

  async connect() {
    await this.litNodeClient.connect()
  }

  // Prove user ownership of wallet to Lit nodes.
  // Required before using other SDK actions.
  async getAuthSig(): Promise<string> {
    return LitJsSdk.checkAndSignAuthMessage({ chain: this.chain })
  }

  // Encrypt arbitrary text and the key used to encrypt it. Returns encrypted
  // version of both.
  async encrypt(text: string): Promise<EncryptionResult> {
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(text)

    const { encryptedSymmetricKey, accessControlConditions } =
      await this.encryptSymmetricKey(symmetricKey)

    return {
      data: encryptedString,
      symmetricKey: {
        encryptedSymmetricKey,
        accessControlConditions,
      },
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

    return await LitJsSdk.decryptString(encryptedString, symmetricKey)
  }

  private async encryptSymmetricKey(
    symmetricKey: string
  ): Promise<EncryptedSymmetricKey> {
    const authSig = await this.getAuthSig()
    const accessControlConditions: object[] = accountRecovery()

    const symmKeyBytes = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: this.chain,
    })

    const encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
      symmKeyBytes,
      "base16"
    )

    return { encryptedSymmetricKey, accessControlConditions }
  }
}

export default new Lit()
