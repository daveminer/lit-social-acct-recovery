export default {
  // Produces a simple default example access condition set modeled after the examples
  // in the docs
  default: [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      //method: "eth_getBalance",
      method: '',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '=',
        value: process.env.REACT_APP_TEST_ACCOUNT_ADDRESS,
      },
      // parameters: [":userAddress", "latest"],
      // returnValueTest: {
      //   comparator: ">=",
      //   value: "0",
      //   //value: "100000000000000000", // 0.1 MATICz
      // },
    },
  ],
  lit_account_recovery: [
    {
      contractAddress: process.env.REACT_APP_ACCOUNT_RECOVERY_CONTRACT,
      functionName: 'recover',
      functionParams: [':userAddress'],
      functionAbi: {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'members',
        outputs: [
          {
            name: 'private key',
            type: 'address',
          },
          {
            name: 'shares',
            type: 'uint256',
          },
          {
            name: 'loot',
            type: 'uint256',
          },
          {
            name: 'exists',
            type: 'bool',
          },
          {
            name: 'highestIndexYesVote',
            type: 'uint256',
          },
          {
            name: 'jailed',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      chain: 'xdai',
      returnValueTest: {
        key: 'shares',
        comparator: '>=',
        value: '1',
      },
    },
  ],
}
