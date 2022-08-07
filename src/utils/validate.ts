const { ethers } = require('ethers');

export const validateERC20 = (address: string) => {
  return ethers.utils.isAddress(address);
};

export const validateBTC = (address: string) => {
  return address.match('^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$') !== null;
};
