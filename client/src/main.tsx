import React from "react"
import ReactDOM from "react-dom/client"
import { getDefaultProvider } from "ethers"
import { WagmiConfig, createClient } from "wagmi"
import App from "./App"
import "./index.css"

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
)
