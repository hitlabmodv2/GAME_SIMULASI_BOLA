---
name: Simulasi Sepak Bola AI cache-busting
description: How script versioning works in index.html for this static football-sim app, and why edits can appear not to take effect.
---

`index.html` loads `players-data/*.js` and `script.js` with a `?v=N` query string. The dev server (`npx serve`) honors conditional requests, so if `N` is unchanged after editing `script.js`, browsers with an existing session already loaded will get a `304 Not Modified` and keep running the old cached code — even though the file on disk changed.

**Why:** This caused a real user-facing bug: a fix to the league scheduling algorithm was correct in the code, but the user's already-open tab kept showing the old buggy behavior because it never re-fetched `script.js`.

**How to apply:** Any time you edit `script.js` (or the `players-data/*.js` files) in this project, bump the `?v=` number for that file in `index.html` in the same change, then tell the user to hard-refresh if they have the app already open.
