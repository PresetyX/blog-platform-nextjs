---
title: "Five TypeScript habits that pay off"
description: "Small conventions that keep a TypeScript codebase easy to change."
date: 2025-12-06
tags: [typescript]
---

1. Turn on `strict` from day one.
2. Prefer discriminated unions over optional fields.
3. Validate data at the boundary (for example with `zod`) and trust types inside.
4. Let inference work: annotate function signatures, not every variable.
5. Treat `any` as a code smell and `unknown` as the safe default.

> Types are documentation that the compiler checks.
