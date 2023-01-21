// TODO: Ok to import twice?
import { useConnect, useDisconnect } from "wagmi"

interface Props {
  style?: React.CSSProperties
}

const WalletStatus = ({ style }: Props) => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({})

  const { disconnect } = useDisconnect()

  return (
    <div style={style}>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}

export default WalletStatus
