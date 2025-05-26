import * as SecureStore from "expo-secure-store";
import { Provider, Account } from "starknet";
import { deriveStarkKeyFromMnemonic } from "./wallet";

const provider = new Provider({
  nodeUrl: "https://starknet-sepolia.public.blastapi.io",
});

export async function getWallet() {
  const mnemonic = await SecureStore.getItemAsync("mnemonic");
  if (!mnemonic) throw new Error("No mnemonic found");

  const { privateKey, publicKey } = deriveStarkKeyFromMnemonic(mnemonic);

  const account = new Account(provider, publicKey, privateKey);
  return { account, provider, address: publicKey };
}
