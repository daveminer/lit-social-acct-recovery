import { useEffect, useState } from "react"
import useSWR from "swr"
import Bundlr from "../../Bundlr"

interface Props {
  //bundlr?: Bundlr
  connect: () => void
}

// TODO: replace with fetcher pattern
const balanceQuery = (bundlr: Bundlr): any =>
  bundlr.fetchBalance().then((res: any) => {
    console.log(res, "RES")
    return res
  })

const BundlrConnectButton = ({ connect }: Props) => {
  //console.log(bundlr?.client, "BUNDLRCLIENT")
  // if (!bundlr?.client) {
  //   return <button onClick={connect}>Connect to Bundlr Network</button>
  // }

  // const { data, error, isLoading } = useSWR<string>(
  //   "bundlr.fetchBalance",
  //   balanceQuery(bundlr!)
  // )

  //let content = "Connect to Bundlr Network"

  //let content = `No data`
  //if (error) content = "Error getting Bundlr node balance."
  //if (isLoading) content = "Bundlr node balance loading..."
  //if (data) content = `Bundlr node balance: ${data}`

  return (
    <button onClick={connect} disabled={false}>
      Connect to Bundlr Network
    </button>
  )
}

export default BundlrConnectButton
