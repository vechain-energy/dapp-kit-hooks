import React from "react"
import { useConnex } from "@vechain/dapp-kit-react"
import { getName } from "./utils"

const MAIN_GENESIS_ID = '0x00000000851caf3cfdb6e899cf5958bfb1ac3413d346d43539627e6be7ec1b4a'

export function useWalletName(address: string | null) {
    const connex = useConnex()
    const [name, setName] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (
            connex.thor.genesis.id === MAIN_GENESIS_ID
            &&
            address
        ) {
            getName(address, connex)
                .then(setName)
                .catch((err) => {
                    console.error(err)
                    setName(null)
                })
        }
        else {
            setName(null)
        }
    }, [connex, address])

    return { name }
}
