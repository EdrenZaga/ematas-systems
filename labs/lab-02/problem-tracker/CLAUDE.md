# CLAUDE.md — Problem Tracker Application

This is the development and agent governance guide for the **Problem Tracker** application. All AI coding partners and human contributors must follow these rules.

---

## 1. Project Purpose & Architecture
The Problem Tracker is a lightweight, responsive defect management tool for software teams. It allows logging, categorizing, filtering, and resolving issues with local persistence.

- **Stack**: Pure HTML5, modern CSS3 (custom properties, flexbox/grid), and modular ES6+ JavaScript.
- **Entry point**: `index.html`
- **Styles**: `style.css`
- **Logic**: `script.js`
- **Data storage**: Browser `localStorage` (key: `problem_tracker_data`)

---

## 2. Agent Governance & Strict Rules

1. **Incremental Steps Only**:
   - Never replace whole files indiscriminately when a small, targeted edit suffices.
   - Explain what you are doing before executing each modification.

2. **Defensive Security & XSS Prevention**:
   - Always escape untrusted user inputs before rendering them to the DOM.
   - Use `textContent` or robust sanitization rather than raw `innerHTML` concatenation.

3. **No External CDNs for Core Functionality**:
   - Do not pull in heavy external frameworks (e.g., React, Vue, jQuery) or remote CDN scripts that could break offline functionality or slow down page loads.

4. **Secrets & Privacy**:
   - Never commit API keys, personal emails, passwords, or private environment variables.
   - All `.env*` files must remain strictly ignored.

---

## 3. Required Verification Commands
Before marking any work as complete, run the following verification checks:

```bash
# Validate JavaScript syntax
node -c script.js

# Confirm clean Git working directory
git status
```

---

## 4. Definition of Done
A feature or bug fix is done when:
1. The DOM reflects the updated data model immediately.
2. The change persists correctly across page refreshes in `localStorage`.
3. All filter, search, and status transition interactions work without console errors.
4. Syntax validation passes with exit code `0`.
