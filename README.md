- A collection of simple helpers to simplify interaction with Vechain.
- The naming lookup is handled with [vet.domains](https://vet.domains) and supported for MainNet only.
- Requires a correctly set up [dapp-kit-react](https://www.npmjs.com/package/@vechain/dapp-kit-react).

```shell
yarn add @vechain.energy/dapp-kit-hooks
```

# Hooks

## `useWalletName(address)`

```js
import { useWallet, useWalletModal } from "@vechain/dapp-kit-react";
import { useWalletName } from "@vechain.energy/dapp-kit-hooks";

export default function UserAddress() {
  const { account, disconnect } = useWallet();
  const walletModal = useWalletModal();
  const { name } = useWalletName(account);

  if (!account) {
    return (
      <Button
        className={className}
        onClick={() => void walletModal.open()}
        variant={variant}
      >
        Connect
      </Button>
    );
  }

  if (name) {
    return <span>{name}</span>;
  }

  return (
    <span>
      {account.slice(0, 6)}...{account.slice(-4)}
    </span>
  );
}
```

# Helper Functions

## `getAddress(name, connex)`

- Helper to always get an address returned, suited for sending integrations.
- Returns given address or a `getRecord()` call.

```js
import { useConnex } from "@vechain/dapp-kit-react"
import { getAddress } from "@vechain.energy/dapp-kit-hooks";

// ..
const connex = useConnex()

// ..

// always get an address
await getAddress("0x981ebf8F1F98465F93fd0208a0b5e531DdC37815") 
await getAddress("hello.vet") 
```


## `getRecord(name, connex)`

- Lookup the address record for a name manually.
- Returns address of ZeroAddress (`0x0000000000000000000000000000000000000000`).

```js
import { useConnex } from "@vechain/dapp-kit-react"
import { getRecord } from "@vechain.energy/dapp-kit-hooks";

// ..
const connex = useConnex()

// ..

// get the address for a .vet name
await getRecord("hello.vet", connex) 
```


## `getName(name, connex)`

- Lookup the primary name for an address.
- Returns name or empty string.

```js
import { useConnex } from "@vechain/dapp-kit-react"
import { getName } from "@vechain.energy/dapp-kit-hooks";

// ..
const connex = useConnex()

// ..

// get the primary name for an address
await getName("0x981ebf8F1F98465F93fd0208a0b5e531DdC37815") 
```
