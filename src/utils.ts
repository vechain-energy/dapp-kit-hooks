import { namehash, isAddress, ZeroAddress } from "ethers";

const VET_REGISTRY_ADDRESS = "0xa9231da8BF8D10e2df3f6E03Dd5449caD600129b";

const ABI = {
    resolver: {
        inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
        name: "resolver",
        outputs: [{ internalType: "address", name: "resolverAddress", type: "address" }],
        stateMutability: "view",
        type: "function",
    },

    addr: {
        inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
        name: "addr",
        outputs: [{ internalType: "address payable", name: "address", type: "address" }],
        stateMutability: "view",
        type: "function",
    },

    name: {
        inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
        name: "name",
        outputs: [{ internalType: "string", name: "name", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
};


export async function getRecord(name: string, connex: Connex): Promise<string> {
    const node = namehash(name);

    const { decoded: { resolverAddress }, reverted: noResolver } = await connex.thor.account(VET_REGISTRY_ADDRESS).method(ABI.resolver).call(node);
    if (noResolver || resolverAddress === ZeroAddress) { return ZeroAddress; }

    const { decoded: { address }, reverted: noLookup } = await connex.thor.account(resolverAddress).method(ABI.addr).call(node);
    if (noLookup) { return ZeroAddress; }

    return address;
}

export async function getName(address: string, connex: Connex): Promise<string> {
    const reverseLookup = `${address.slice(2).toLowerCase()}.addr.reverse`;
    const node = namehash(reverseLookup);

    const { decoded: { resolverAddress }, reverted: noResolver } = await connex.thor.account(VET_REGISTRY_ADDRESS).method(ABI.resolver).call(node);
    if (noResolver || resolverAddress === ZeroAddress) { return ''; }


    const { decoded: { name }, reverted: noLookup } = await connex.thor.account(resolverAddress).method(ABI.name).call(node);
    if (noLookup) { return ''; }

    return name;
}

export async function getAddress(addressOrName: string, connex: Connex): Promise<string> {
    return isAddress(addressOrName) ? addressOrName : await getRecord(addressOrName, connex)
}
