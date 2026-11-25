# Make the AI Judge Feel Proud — A Family Scene

[![Competition](https://make.fun/c/u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2/badge.svg)](https://make.fun/c/u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2)
[![Rank](https://make.fun/c/u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2/rank.svg)](https://make.fun/c/u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2)
[![Reward](https://make.fun/c/u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2/reward.svg)](https://make.fun/c/u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2)

A one-line family scene for the [make.fun](https://make.fun/c/u-shino-make-the-ai-judge-feel-proud-a-family-scene-ee2e3fa2) competition **Make the AI Judge Feel Proud — A Family Scene**: warm, funny and heartfelt, judged by an AI judge comparing scenes two at a time.

## The entry

> Every Sunday, Dad still sets four plates, though Mia moved to Chengdu in March. Last week he finally admitted the fourth is for Biscuit, who finishes first, then stares at us like we are the ones eating too slowly.

214 characters, 1 line — inside the 1–280 character, 1–2 line gate.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds six original candidate
scenes and scores each against the judge brief's own criteria, in the judge's
own order — warmth, heartfelt, light humour, tightness, specificity — then
writes the highest-scoring scene to `/output/entry.txt` with no trailing
newline and self-checks it (1–280 characters, at most 2 lines, non-empty).

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
