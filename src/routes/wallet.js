const express = require("express");
const StellarSdk = require("stellar-sdk");
const fetch = require("node-fetch");
const Wallet = require("../models/wallet");

const router = express.Router();

router.post("/wallets", async (req, res) => {
  try {
    
    const keypair = StellarSdk.Keypair.random();
    const publicKey = keypair.publicKey();

    
    await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );

    
    const wallet = await Wallet.create({
      publicKey,
    });

    return res.status(201).json({
      walletId: wallet.walletId,
      publicKey: wallet.publicKey,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create wallet",
      error: error.message,
    });
  }
});

module.exports = router;