---
title: JWT Misconfiguration
date: 2026-03-12
readTime: 8 min
category: writeup
description: A deep dive into common JWT implementation mistakes and how to exploit them.
icon: 🔑
coverImage: ""
---

# JWT Misconfiguration Writeup

JSON Web Tokens are everywhere — and so are their misconfigurations.

## Challenge Overview

Target application used JWTs for session management with several critical flaws.

## Vulnerability 1: Algorithm Confusion

The server accepted both RS256 and HS256. By switching the algorithm to HS256 and signing with the public key (which is, well, public), we forged valid tokens.

```python
import jwt

public_key = open('public.pem').read()
token = jwt.encode({"sub": "admin", "role": "admin"}, public_key, algorithm="HS256")
```

## Vulnerability 2: Missing Expiration

Tokens had no `exp` claim. Once obtained, they were valid forever.

## Vulnerability 3: Weak Secret

The HS256 secret was `password123`. Cracked in seconds with `jwt-cracker`.

## Lessons

- Always validate the algorithm server-side
- Enforce token expiration
- Use strong, random secrets (256+ bits)
- Consider using `PASETO` instead of JWT
