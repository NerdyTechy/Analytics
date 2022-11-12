# Statistics
A small express project that allows me to track usage of statistics for some of my tools.

## How it works
Every time that one of my tools is launched, a HTTP POST request with a hashed identifier will be sent to an endpoint on this API. This means that I can track the total amount of users of my projects, and how frequently they are used. Despite the identifier being hashed, I try not to use anything sensitive anyway. For example, with Discord bots I use the bot's client ID as opposed to something private like the token. This means that even if I could reverse the hash (which is done by the thing that you're hosting, not the API itself), the only information that I actually gain is something that is both already public, and completely useless to me.

## Why open source
Claiming that the analytics are "unidentifiable" is one thing, but actually being able to see that I'm not collecting more information than I say that I am is much better.

## Can I deploy this myself for _____ ?
There's certainly much better solutions out there than this, but go for it.
