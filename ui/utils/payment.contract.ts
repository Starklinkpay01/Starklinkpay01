import { Contract, uint256 } from "starknet";
import { provider } from "./starknet.config";
import { getWallet } from "./useWallet";
import paymentAbi from "./abi/payment_abi.json";

// Replace this with your actual contract address after deployment
const CONTRACT_ADDRESS = "0xYOUR_PAYMENT_CONTRACT_ADDRESS";

import abi from "../utils/abi/payment_abi.json";

export const paymentContract = new Contract(
  abi.abi,
  CONTRACT_ADDRESS,
  provider
);

export async function getYieldBalance(): Promise<string> {
  const { account } = await getWallet();
  // Replace with your actual USDT contract address
  const USDT_CONTRACT = "0xYOUR_USDT_CONTRACT_ADDRESS";
  const contract = new Contract(paymentAbi.abi, USDT_CONTRACT, account);
  const result = await contract.call("balanceOf", [account.address]);

  // Convert Starknet Uint256 to decimal balance
  const balanceBigInt =
    BigInt(result[0].low.toString()) +
    BigInt(result[0].high.toString()) * BigInt(2 ** 128);

  const balance = Number(balanceBigInt) / 1e18;
  return balance.toFixed(2); // return as string for UI
}

export async function depositToYield(amount: string) {
  const parsedAmount = uint256.bnToUint256(BigInt(amount));
  return await paymentContract.invoke("deposit_to_yield", [parsedAmount]);
}
