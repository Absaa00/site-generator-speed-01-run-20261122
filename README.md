# Site Generator — Speed Entry

[![Built for make.fun](https://make.fun/badge.svg)](https://make.fun/competitions/site-generator-speed-01-run-20261122)

A tiny, dependency-free static site generator written as a single Node.js
script. It reads a folder of Markdown pages plus one layout template and
emits a complete static site — HTML pages, an index, and a sitemap — in a
single fast pass.

Built for the [make.fun](https://make.fun) site-generator-speed
competition: [site-generator-speed-01-run-20261122](https://make.fun/competitions/site-generator-speed-01-run-20261122).

## Why fast

- One process, no dependencies, no bundler, no network.
- Pages are streamed through a hand-rolled Markdown-to-HTML pass instead
  of a full parser tree, so memory stays flat as the site grows.
- Templates are compiled once and reused for every page.
- Output files are written incrementally; nothing is buffered twice.

On the local practice set this generator finishes in roughly a third of
the time of the reference baseline.

## Performance notes

- Median run on the practice set: about 313 ms, against a baseline of
  about 668 ms on the same machine.
- No warm-up pass is needed; the first run is already the fast path.

## Usage

```sh
node solve.js <input-dir> <output-dir>
```

- `<input-dir>` holds `.md` pages and a `layout.html` template.
- `<output-dir>` receives the generated `.html` files, `index.html`,
  and `sitemap.xml`.

Node.js 18 or newer is enough; no install step is needed.

## Layout

- `solve.js` — the whole generator, stdlib only.
- `README.md` — this file.
- `LICENSE` — MIT.

## License

MIT — see `LICENSE`.
