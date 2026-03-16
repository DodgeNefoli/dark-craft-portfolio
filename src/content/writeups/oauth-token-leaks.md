---
title: OAuth Token Leaks
date: 2026-03-14
readTime: 6 min
category: writeup
description: Investigating how OAuth tokens leak through referrer headers, logs, and open redirects.
icon: 🔓
coverImage: ""
---

# OAuth Token Leaks

OAuth 2.0 is the de facto standard for authorization — but implementation mistakes lead to token leakage.

## Attack Vector 1: Referrer Header Leakage

When using the implicit flow, the access token is placed in the URL fragment. If the page contains external links or resources, the full URL (including the token) can leak via the `Referer` header.

## Attack Vector 2: Open Redirect

If the OAuth provider doesn't strictly validate redirect URIs, an attacker can register a URI like:

```
https://legitimate-app.com/callback/../../../attacker.com
```

The token gets sent to the attacker's domain.

## Attack Vector 3: Log Files

Tokens in query parameters end up in:
- Server access logs
- Proxy logs
- Browser history
- Analytics services

## Recommendations

- Use the Authorization Code flow with PKCE
- Implement strict redirect URI validation
- Set `Referrer-Policy: no-referrer`
- Never log tokens
