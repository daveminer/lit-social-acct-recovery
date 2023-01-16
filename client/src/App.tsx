import { useEffect, useState } from 'react'
import { WebBundlr } from '@bundlr-network/client'
import { providers } from 'ethers'

import Lit from './Lit'
import './App.css'

function App() {
  const [text, onChangeText] = useState('')
  const [bundlr, setBundlr] = useState<WebBundlr | undefined>(undefined)

  useEffect(() => {
    document.addEventListener(
      'lit-ready',
      function (e) {
        console.log('LIT network is ready')
        //setNetworkLoading(false); // replace this line with your own code that tells your app the network is ready
      },
      false
    )

    Lit.connect()

    if (!window.ethereum === undefined) {
      console.info("Sign in to wallet provider.")
      return
    }

    // const privateKeyFile = import.meta.env.VITE_BUNDLR_PRIVATE_KEY_FILE
    // console.log(privateKeyFile, "PKF")
    window.ethereum.enable()

    //  const jwk = JSON.parse(fs.readFileSync(privateKeyFile).toString())
    const provider = new providers.Web3Provider(window.ethereum)


    console.log(provider, "PROVIDER")

    if (bundlr === undefined) {
      const bundlrInstance = new WebBundlr("http://node1.bundlr.network", "matic", provider)
      setBundlr(bundlrInstance)
    }

  })

  const handle = async () => {

    const secret = await Lit.encrypt(text)
    const packagedData = JSON.stringify(secret)

    // Upload data
    const dataToUpload = "Hello world."
    try {
      console.log(dataToUpload, "DTU")
      let response = await bundlr?.upload(dataToUpload)
      console.log(`Data uploaded ==> https://arweave.net/${response.id}`)
    } catch (e) {
      console.log("Error uploading file ", e)
    }

    //console.log(Bundlr, "BUN")

    // const ceramicDevSeed = crypto.randomBytes(32)
    // console.log(ceramicDevSeed, 'DEV SEED')

    // const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')
    // ceramic.authenticateCeramic(ceramicDevSeed)

    //await Ceramic.tryEncrypt()

    // Store the encrypted string on Ceramic

    // let {decryptedString} = await Lit.decrypt(
    //   encryptedString,
    //   encryptedSymmetricKey
    // )

    //console.log(decryptedString, 'DECRYPT')
  }

  return (
    <div>
      <input

        placeholder='Recovery phrase goes here'
      />
      <button onClick={handle}>Encrypt</button>
    </div>
  )
}

export default App
