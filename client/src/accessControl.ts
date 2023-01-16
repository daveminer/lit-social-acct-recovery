export const accountRecovery = () => {
  return [
    {
      contractAddress: process.env.EXPO_ACCOUNT_RECOVERY_CONTRACT,
      functionName: 'unlock',
      functionParams: ':secretIndex',
      functionAbi: {
        inputs: [
          {
            type: 'uint256',
            name: 'secretIndex',
            internalType: 'uint256',
          },
        ],
        name: 'unlock',
        outputs: [
          {
            type: 'bool',
            name: '',
            internalType: 'bool',
          },
        ],
      },
      chain: process.env.EXPO_CHAIN,
      returnValueTest: {
        key: '',
        comparator: '=',
        value: '0',
      },
    }
  ]
}
