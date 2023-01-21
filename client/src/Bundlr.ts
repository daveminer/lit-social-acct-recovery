import { WebBundlr } from "@bundlr-network/client"
import { UploadResponse } from "@bundlr-network/client/build/common/types"
import BigNumber from "bignumber.js"

class Bundlr {
  client?: WebBundlr

  async ready(provider: any): Promise<void> {
    if (!this.client) this.client = this.buildClient(provider)

    return await this.client!.ready()
  }

  async fetchBalance(): Promise<string> {
    let bal = await this.client?.getLoadedBalance()

    // Coerce to string rather than import BigNumber.js for now
    return bal ? bal?.toString() : "0"
  }

  async fundNode() {
    const result = await this.client!.fund(1)
    console.log(result)
  }

  async uploadSecret(secret: string): Promise<UploadResponse> {
    return this.client!.upload(secret)
  }

  private buildClient(provider: any) {
    return new WebBundlr(
      import.meta.env.VITE_BUNDLR_NODE,
      import.meta.env.VITE_BUNDLR_CURRENCY,
      provider,
      {
        providerUrl: import.meta.env.VITE_BUNDLR_PROVIDER,
      }
    )
  }

  private fundAmountParsed = (fundAmount: number) =>
    new BigNumber(fundAmount).multipliedBy(this.client!.currencyConfig.base[1])
}

//export default Bundlr

export default new Bundlr()
