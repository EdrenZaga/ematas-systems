# Lab 2 Reflection: Direct the Agent and Deploy

**Live URL**: [https://ematas-systems.vercel.app](https://ematas-systems.vercel.app)

---

## 1. Comparing One-Shot Prompting vs. Small Checkable Steps

Building the problem tracker through a single giant prompt (`one-shot/`) produced a working basic app, but with clear weaknesses:
- **One-Shot Weaknesses**: The one-shot version had minimal input validation, tightly coupled styling with hardcoded borders, and lacked modular separation. Because everything was generated at once, reviewing and debugging specific logic was difficult.
- **Iterative Checkable Steps (`problem-tracker/`)**: Building the app in small milestones (data model $\rightarrow$ UI metrics dashboard $\rightarrow$ dynamic filter toolbar $\rightarrow$ state store $\rightarrow$ confirmation dialogs) gave me granular control. At each checkpoint, I could verify the changes, test the UI in the browser, and ensure no regressions occurred before moving forward.

Iterative development is far more reliable and controllable than relying on one massive output.

---

## 2. Directing the Agent with `CLAUDE.md`

Writing a scoped `CLAUDE.md` inside `problem-tracker/` established clear boundaries and architectural standards for the agent:
- It specified the stack constraints (pure HTML5, CSS3 variables, ES6+ JavaScript without bloated frameworks).
- It mandated defensive coding (strict XSS sanitization via `escapeHtml`) and forbade committing sensitive files or API keys.
- It defined mandatory verification commands (`node -c script.js` and `git status`) as the Definition of Done before completing tasks.

Having `CLAUDE.md` acts as an automated project manager that keeps the agent consistent across sessions.

---

## 3. Plan Mode and Permission Rules in `.claude/settings.json`

Using Plan Mode to produce `plan.md` forced us to think through data schemas, edge cases, and component lifecycles before touching the code. This prevented mid-development refactors.

Adding strict permissions in `.claude/settings.json` established hard guardrails the agent cannot ignore:
- **Deny Rules**: Blocked destructive bash commands like `rm *`, `rm -rf *`, force-pushing (`git push --force *`), and reading sensitive `.env` files.
- **Ask Rules**: Prompted for confirmation on remote pushes.

These permissions transformed the agent from an unpredictable actor into a trustworthy collaborator operating within safe boundaries.

---

## 4. Deploying to Vercel and Continuous Deployment

Deploying the repository to Vercel closed the development loop:
- By linking the GitHub repository `EdrenZaga/ematas-systems` to Vercel, every `git push` to `main` triggers an automated build and instant deployment to a public URL.
- Configuring `vercel.json` ensures that visitors to the root domain land directly on the Problem Tracker dashboard, while still preserving access to our Lab 1 applications.
- Seeing our local code immediately live on the public internet made the SDLC tangible and production-ready.

---

## 5. Key Takeaways for Directing AI Agents

Directing an AI agent well requires:
1. **Never relying on one-shot requests for production software**: Break tasks into small, verifiable chunks.
2. **Explicit rules over assumptions**: Define constraints in `CLAUDE.md` and enforce security in `settings.json`.
3. **Verify every step**: Always check syntax and runtime state before shipping.
