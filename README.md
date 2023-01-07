## Social Recovery

#### Terms

`secrets` - text that will stay encrypted until the recovery ceremony is completed
`contacts` - the other users/entities that need to complete the ceremony for the secret to unlock


#### Behavior

When a contract approves the unlocking of a secret the block number is recorded. On the other hand, when a secret is unlocked the block number is also recorded. The last unlock approval block number of all contracts must be greater than the block number of the last unlock action.


#### Lifecycle

```mermaid
flowchart TD
	A[Encrypt secret] --> B[Write encrypted secret to IPFS];
	B --> C[Write CID to chain];
	C --> D[Add contacts to contract entry]
	D --> E[Request recovery]
	E --> F[Contacts Approve]
	F --> G[Unlock is called via Lit access control]
	G --> E
```


#### Testing

```
make t
`````
