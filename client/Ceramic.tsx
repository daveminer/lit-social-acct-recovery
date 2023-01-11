// import { CeramicClient } from '@ceramicnetwork/http-client'
// //import { create as createIPFS } from 'ipfs-core'
// import { Ed25519Provider } from 'key-did-provider-ed25519'
// import { getResolver } from 'key-did-resolver'
// import crypto from 'crypto'
// import { DID } from 'dids'

import { Integration } from 'lit-ceramic-sdk'

class Ceramic {
  apiUrl = 'https://ceramic-clay.3boxlabs.com'
  client = new Integration(this.apiUrl, "ethereum")
  // client = new CeramicClient(this.apiUrl)
  // did = undefined
  // ipfs = undefined

  connect = async () => {
    //this.ipfs = await createIPFS()

    //let litCeramicIntegration = new Integration("https://ceramic-clay.3boxlabs.com", "ethereum")
    //litCeramicIntegration.startLitClient(window)

    // const ceramicDevSeed = crypto.randomBytes(32)
    // const provider = new Ed25519Provider(ceramicDevSeed)

    // const did = new DID({ provider, resolver: getResolver() })
    // console.log(ceramicDevSeed, 'DEV SEED')

    // await did.authenticate()
    // this.client.did = did



    // const cleartext = { some: 'data', foo: 'bar' }

    // console.log(did, "DID")
    // const jwe = await did.createDagJWE(cleartext, [
    //   did._id
    // ])

    // const jweCid = await ipfs.dag.put(jwe, {
    //   format: 'dag-jose',
    //   hashAlg: 'sha2-256',
    // })

    // const dagJWE = await ipfs.dag.get(jweCid)
    // console.log(await did.decryptDagJWE(dagJWE))
  }
}

export default new Ceramic()
