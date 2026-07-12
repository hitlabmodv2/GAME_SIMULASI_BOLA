---
name: Simulasi Sepak Bola AI — round-robin schedule design
description: How Liga's match schedule is generated, and why it supports arbitrary "manual" match counts safely.
---

Liga's schedule (`generateRoundRobinSchedule`) is built once as a fixed set of circle-method
"matchday" rounds (each round = every team paired with exactly one opponent). It then plays
through however many rounds are requested by literally cycling through that same base round
list, flipping home/away labels on every other full cycle.

**Why:** because every round is by construction a perfect pairing of all teams, every team's
match count is always exactly equal to the number of rounds requested — regardless of whether
that number is a clean multiple of `teamCount - 1` (the old fixed single/double-leg case) or an
arbitrary number typed manually by the user. This is what let "jumlah pertandingan manual" (user
types their own per-team match count) be added on top of the existing "format" (single/double)
dropdown without risking uneven schedules or bugs — no new scheduling algorithm was needed, just
generalizing the leg count into a round count.

**How to apply:** if asked for more schedule variants in Liga (e.g. "best of N", partial season,
extra rounds), reuse this cycling approach (`round % baseRoundsCount`, reverse home/away when
`floor(round / baseRoundsCount)` is odd) rather than writing a new pairing algorithm — it keeps
the "every team plays the same number of matches" invariant for free.
