import { encrypt } from '../utils/keystore';
import { subheading } from './../utils/log';

export const generate = async (password: string, path: string) => {
  // Checks if it is a json file otherwise, cast to json
  if (path.slice(-5).toLowerCase() !== '.json') path += '.json';

  try {
    await encrypt(password, path).then(() => {
      subheading(`Generated encrypted wallet => ${path.split('\\').pop()}`, true);
    });
  } catch (error) {
    subheading(`Generate failed ${error}`, false);
  }
};
