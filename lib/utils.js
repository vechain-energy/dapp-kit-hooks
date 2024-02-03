"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = exports.getName = exports.getRecord = void 0;
const ethers_1 = require("ethers");
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
function getRecord(name, connex) {
    return __awaiter(this, void 0, void 0, function* () {
        const node = (0, ethers_1.namehash)(name);
        const { decoded: { resolverAddress }, reverted: noResolver } = yield connex.thor.account(VET_REGISTRY_ADDRESS).method(ABI.resolver).call(node);
        if (noResolver || resolverAddress === ethers_1.ZeroAddress) {
            throw new Error('Resolver not configurd');
        }
        const { decoded: { address }, reverted: noLookup } = yield connex.thor.account(resolverAddress).method(ABI.addr).call(node);
        if (noLookup) {
            throw new Error('Resolver returned no address');
        }
        return address;
    });
}
exports.getRecord = getRecord;
function getName(address, connex) {
    return __awaiter(this, void 0, void 0, function* () {
        const reverseLookup = `${address.slice(2).toLowerCase()}.addr.reverse`;
        const node = (0, ethers_1.namehash)(reverseLookup);
        const { decoded: { resolverAddress }, reverted: noResolver } = yield connex.thor.account(VET_REGISTRY_ADDRESS).method(ABI.resolver).call(node);
        if (noResolver || resolverAddress === ethers_1.ZeroAddress) {
            return '';
        }
        const { decoded: { name }, reverted: noLookup } = yield connex.thor.account(resolverAddress).method(ABI.name).call(node);
        if (noLookup) {
            return '';
        }
        return name;
    });
}
exports.getName = getName;
function getAddress(addressOrName, connex) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, ethers_1.isAddress)(addressOrName) ? addressOrName : yield getRecord(addressOrName, connex);
    });
}
exports.getAddress = getAddress;
