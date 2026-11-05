# RanxiHub.AI — English site

A standalone, dependency-free English version of the RanxiHub.AI project site,
prepared for GitHub Pages. It is a **static site**: plain HTML, CSS, a little vanilla
JavaScript, and local image/video assets. There is no build step, no package manager,
no server and no backend.

The Chinese source site lives in `../site/` in the working repository. This directory is
the English mirror and is intended to be pushed as the **root of its own repository**.

## Deploy to GitHub Pages

### 1. Create the repository and push

```bash
cd site-en
git init
git add .
git commit -m "Initial English site"
git branch -M main
git remote add origin https://github.com/<your-account>/<your-repo>.git
git push -u origin main
```

### 2. Enable Pages

In the repository: **Settings → Pages → Build and deployment → Deploy from a branch**,
select branch `main` and folder `/ (root)`, then Save. GitHub will publish at
`https://<your-account>.github.io/<your-repo>/`. If the repository is named
`<your-account>.github.io`, it publishes at the apex instead.

All internal links and asset paths are **relative**, so both a project subpath and an
apex domain work unchanged. Do not rewrite them to absolute `/...` paths.

### 3. Optional: custom domain

After DNS is configured, add a file named `CNAME` at the repository root containing
only the hostname, for example:

```
www.example.com
```

Then enable **Enforce HTTPS** in the Pages settings. No HTML or CSS changes are needed.
For a domain served in mainland China, ICP filing is a separate prerequisite and is not
handled by GitHub Pages.

## What is in here

| Path | Purpose |
|---|---|
| `index.html` | Home, project matrix, roadmap, approach, contact |
| `about.html` | Founder and project overview |
| `ahm/` | Agent Health Monitor product and report pages (6 pages) |
| `nexus/` | Nexus long-term memory product page |
| `dllm/` | DLLM personal model page |
| `lab/` | Lab: papers, public research artifacts, three research tracks |
| `others/` | FrameTale, Digital Life, DSH-PLUS |
| `frametale/` | FrameTale detail page |
| `research.html` | Legacy redirect to `lab/index.html` |
| `assets/` | Shared CSS, motion layer, images and the concept video |
| `.nojekyll` | Tells Pages to serve files verbatim (no Jekyll processing) |
| `404.html` | Custom not-found page |

## Notes for maintainers

- **Contact form.** The Chinese site writes messages to a WorkBuddy CloudBase table.
  That SDK is origin-bound and cannot run on GitHub Pages, so this build uses a
  zero-dependency `mailto:` flow instead: the form builds a prefilled email draft to
  `ranxihub@agent.qq.com` and opens the visitor's mail client. It never claims a
  message was delivered. To switch to a real backend, replace the inline script at the
  bottom of `index.html` and keep the `#messageForm` / `#messageStatus` element IDs.
- **Assets.** `assets/video/digitallife-30s.mp4` is about 8 MB. Total repository size is
  about 11 MB, well within GitHub's limits. Images are WebP and are marked as
  AI-generated concept illustrations in their captions.
- **Animations.** `lab/index.html` intentionally does not load `assets/motion.js`; it
  uses pure CSS reveal animations so content is visible on the first frame. Other pages
  use the shared `motion.js` layer with `motion.css`.
- **Status wording.** Product status is deliberately explicit: "Pre-launch validation",
  "Validation release published", "In closed beta", "In development", "Planned".
  Planned items are directional only. Preprints are labelled as not peer reviewed.
  Please keep that distinction when editing copy.
- **Regenerating.** The Chinese site is the source of truth for structure. The English
  mirror was produced by `../scripts/build_en_site.py` (structural pass), the per-page
  `../scripts/en_*.py` translation mappings, and `../scripts/fix_en_final.py` (final
  consistency pass: static-site cleanup, terminology unification, fullwidth-punctuation
  normalisation). All three stages are idempotent. `../scripts/verify_en_site.py` is the
  acceptance check (CJK/fullwidth residue, disclosure red lines, backend calls, relative
  links, structural parity). Those scripts live outside this directory and are not shipped.
  After changing Chinese source files, re-run the stages in that order rather than copying
  Chinese pages over this tree.

## Content

Product and research descriptions on this site reflect work in progress. Nothing here
is a claim of general availability, paying customers, or peer-reviewed publication.
Site content © 2026 RanxiHub.AI.
