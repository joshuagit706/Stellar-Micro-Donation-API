const fs = require('fs');
const path = require('path');

const WALLETS_DB_PATH = './data/wallets.json';

class Wallet {
  static ensureDbDir() {
    const dir = path.dirname(WALLETS_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  static loadWallets() {
    this.ensureDbDir();
    if (!fs.existsSync(WALLETS_DB_PATH)) {
      return [];
    }

    try {
      const data = fs.readFileSync(WALLETS_DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static saveWallets(wallets) {
    this.ensureDbDir();
    fs.writeFileSync(WALLETS_DB_PATH, JSON.stringify(wallets, null, 2));
  }

  static create(publicKey) {
    const wallets = this.loadWallets();

    const newWallet = {
      walletId: Date.now().toString(),
      publicKey,
      createdAt: new Date().toISOString(),
    };

    wallets.push(newWallet);
    this.saveWallets(wallets);

    return newWallet;
  }

  static getAll() {
    return this.loadWallets();
  }

  static getById(walletId) {
    const wallets = this.loadWallets();
    return wallets.find(w => w.walletId === walletId);
  }

  static getByPublicKey(publicKey) {
    const wallets = this.loadWallets();
    return wallets.find(w => w.publicKey === publicKey);
  }
}

module.exports = Wallet;