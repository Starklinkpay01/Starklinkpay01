import { generateMnemonic as genMnemonic, mnemonicToSeedSync } from 'bip39';
import { HDKey } from '@scure/bip32';
import { ec } from 'starknet';

export function generateMnemonic(): string {
  return genMnemonic();
}

export function deriveStarkKeyFromMnemonic(mnemonic: string): {
  address: string;
  privateKey: string;
  publicKey: string;
} {
  const seed = mnemonicToSeedSync(mnemonic);
  const masterNode = HDKey.fromMasterSeed(seed);
  const child = masterNode.derive("m/44'/9004'/0'/0/0");

  const privateKey = ec.starkCurve.grindKey(child.privateKey!);
  const publicKey = ec.starkCurve.getStarkKey(privateKey);

  return {
    privateKey,
    publicKey,
    address: publicKey, // we can later replace this with deployed account address
  };
}
