---
title: XSS in Modern Frameworks
date: 2026-03-10
readTime: 5 min
category: note
description: How modern frameworks like React and Vue handle XSS — and where they still fail.
icon: 🛡️
coverImage: ""
---

# XSS in Modern Frameworks

Cross-Site Scripting remains one of the most prevalent web vulnerabilities, even in modern framework ecosystems.

## React's Default Protection

React automatically escapes values embedded in JSX, which prevents most XSS attacks:

```jsx
const userInput = '<script>alert("xss")</script>';
return <div>{userInput}</div>; // Safe — rendered as text
```

However, `dangerouslySetInnerHTML` bypasses this protection entirely.

## Vue's v-html Directive

Similarly, Vue escapes interpolations by default, but `v-html` renders raw HTML:

```html
<div v-html="userInput"></div> <!-- Dangerous -->
```

## Where Frameworks Still Fail

- **URL injection**: `href={userInput}` can execute `javascript:` URIs
- **Server-side rendering**: Hydration mismatches can introduce XSS
- **Third-party libraries**: Many UI libraries don't sanitize props

## Mitigation

Always sanitize user input server-side. Use CSP headers. Audit dependencies regularly.
