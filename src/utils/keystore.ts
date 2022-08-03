import { Keystore, generatePhrase, encryptToKeyStore, decryptFromKeystore } from '@xchainjs/xchain-crypto';
import fs from 'fs';

/**
 * Generate & encrypt a new phrase.
 *
 * @param {string} password The encryption password for the new phrase.
 * @param {number} entropy The new phrase size.
 * @returns {Keystore} The generated encrypted phrase.
 */
export const encrypt = async (password: string, path: string, entropy = 24): Promise<Keystore> => {
  const phrase = generatePhrase(entropy);

  console.log(`Generating new phrase: ${phrase}`);

  const encrypted_phrase: Keystore = await encryptToKeyStore(phrase, password);

  if (path) fs.writeFileSync(path, JSON.stringify(encrypted_phrase));

  return encrypted_phrase;
};

/**
 * Decrypts a keystore to a phrase.
 *
 * @param {Keystore} keystore The encrypted phrase in the form of a keystore.
 * @param {string} password The encryption password.
 * @returns {string} The decrypted phrase.
 */
export const decrypt = async (keystore: Keystore, password: string): Promise<string> => {
  try {
    const decryptedKeystore = await decryptFromKeystore(keystore, password);
    return decryptedKeystore;
  } catch (e) {
    return '';
  }
};
