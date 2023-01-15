import Bundlr from '@bundlr-network/client'
import fs from 'fs'

class BundlrClient {
  //url = process.env.EXPO_BUNDLR_NODE
  //currencyName = process.env.EXPO_BUNDLR_CURRENCY
  client


  constructor() {
    const privateKeyFile = process.env.EXPO_BUNDLR_PRIVATE_KEY_FILE
    console.log(privateKeyFile, "PKF")
    const jwk = JSON.parse(fs.readFileSync(privateKeyFile).toString())

    this.client = new Bundlr(this.url, this.currencyName, jwk)
  }
}

export default new BundlrClient()
