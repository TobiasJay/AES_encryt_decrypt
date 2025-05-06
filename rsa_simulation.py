
from Crypto.Util.number import inverse, bytes_to_long, long_to_bytes

# RSA parameters (512-bit RSA for educational purposes only)
p = 100392089237316158323570985008687907853269981005640569039457584007913129640081
q = 90392089237316158323570985008687907853269981005640569039457584007913129640041
e = 65537

# Compute modulus and totient
n = p * q
phi_n = (p - 1) * (q - 1)

# Compute private key exponent
d = inverse(e, phi_n)

# Message to encrypt (max 60 bytes)
message = 'Scaramouche, Scaramouche, will you do the Fandango? 💃🏽'.encode('utf-8')  # 53 bytes
print("Original message:", message.decode())

# Convert message to integer
m_int = bytes_to_long(message)

# Encrypt message
ciphertext = pow(m_int, e, n)
print("Ciphertext:", ciphertext)

# Decrypt message
decrypted_int = pow(ciphertext, d, n)
decrypted_message = long_to_bytes(decrypted_int)
print("Decrypted message:", decrypted_message.decode())

# Print RSA parameters
print("Modulus (n):", n)
print("Private exponent (d):", d)
