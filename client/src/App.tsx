import { useEffect, useState } from "react"
import { useDisconnect, useProvider, useSigner } from "wagmi"
import Lit from "./Lit"
import WalletStatus from "./components/WalletStatus"
import "./App.css"

function App() {
  const [text, onChangeText] = useState("")

  const { disconnect } = useDisconnect()

  const rainbowKitProvider: any = useProvider()
  const { data: rainbowKitSigner, isError, isLoading } = useSigner()
  rainbowKitProvider.getSigner = () => rainbowKitSigner

  useEffect(() => {
    document.addEventListener(
      "lit-ready",
      function (e) {
        console.log("LIT network is ready")
        //setNetworkLoading(false); // replace this line with your own code that tells your app the network is ready
      },
      { once: true }
    )

    Lit.connect()
  }, [Lit])

  const handleUploadButtonClick = async () => {
    //const secret = await Lit.encrypt(text)
    //const packagedData = JSON.stringify(secret)

    // Upload data
    try {
      //let response = await bundlr?.uploadSecret(packagedData)

      console.log(`Data uploaded ==> https://arweave.net/${response.id}`)
    } catch (e) {
      console.log("Error uploading file ", e)
    }
  }

  return (
    <div>
      <WalletStatus></WalletStatus>
      <button onClick={() => disconnect()}>Disconnect</button>
      <input placeholder="Secret goes here" />
      <button onClick={handleUploadButtonClick}>Encrypt</button>
    </div>
  )
}

export default App
