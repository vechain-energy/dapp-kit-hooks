"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletName = void 0;
const react_1 = __importDefault(require("react"));
const dapp_kit_react_1 = require("@vechain/dapp-kit-react");
const utils_1 = require("./utils");
const MAIN_GENESIS_ID = '0x00000000851caf3cfdb6e899cf5958bfb1ac3413d346d43539627e6be7ec1b4a';
function useWalletName(address) {
    const connex = (0, dapp_kit_react_1.useConnex)();
    const [name, setName] = react_1.default.useState(null);
    react_1.default.useEffect(() => {
        if (connex.thor.genesis.id === MAIN_GENESIS_ID
            &&
                address) {
            (0, utils_1.getName)(address, connex)
                .then(setName)
                .catch((err) => {
                console.error(err);
                setName(null);
            });
        }
        else {
            setName(null);
        }
    }, [connex, address]);
    return { name };
}
exports.useWalletName = useWalletName;
