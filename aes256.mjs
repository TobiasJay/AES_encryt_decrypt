#!/usr/bin/env node

import crypto from 'crypto';

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 4) {
  console.error('Usage: node aes256cbc.mjs [-e|-d] <message|ciphertext> <key> <iv>');
  process.exit(1);
}

const mode = args[0];
const input = args[1];
const key = args[2];
const iv = args[3];

// Ensure key and IV meet requirements
if (key.length < 32) {
  console.error('Error: Key must be at least 32 bytes long');
  process.exit(1);
}

if (iv.length < 16) {
  console.error('Error: IV must be at least 16 bytes long');
  process.exit(1);
}

// Create key and IV buffers
const keyBuffer = Buffer.from(key.slice(0, 32), 'utf8');
const ivBuffer = Buffer.from(iv.slice(0, 16), 'utf8');

/**
 * Encrypts a message using AES-256-CBC
 * @param {string} message - The message to encrypt
 * @param {Buffer} key - The encryption key (32 bytes)
 * @param {Buffer} iv - The initialization vector (16 bytes)
 * @returns {string} The encrypted message as a hex string
 */
function encrypt(message, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * Decrypts a hex string using AES-256-CBC
 * @param {string} encryptedHex - The encrypted message as a hex string
 * @param {Buffer} key - The encryption key (32 bytes)
 * @param {Buffer} iv - The initialization vector (16 bytes)
 * @returns {string} The decrypted message
 */
function decrypt(encryptedHex, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Execute the appropriate action based on mode
try {
  if (mode === '-e') {
    const encrypted = encrypt(input, keyBuffer, ivBuffer);
    console.log(encrypted);
  } else if (mode === '-d') {
    const decrypted = decrypt(input, keyBuffer, ivBuffer);
    console.log(decrypted);
  } else {
    console.error('Error: First argument must be either -e (encrypt) or -d (decrypt)');
    process.exit(1);
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}