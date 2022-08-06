import { Keystore } from '@xchainjs/xchain-crypto';
import fs from 'fs';
import { decrypt } from './keystore';

/**
 * Takes in the file path and password and decrypts the keystore.
 *
 * @param {string} password The encryption password.
 * @param {string} path The path to the encrypted file.
 * @returns {string} The decrypted phrase.
 */
export const login = async (password: string, path: string) => {
  const keystore: Keystore = JSON.parse(fs.readFileSync(path).toString());
  return await decrypt(keystore, password);
};
