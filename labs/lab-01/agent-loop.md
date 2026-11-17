# The Agent Loop: Gather Context, Act, Check

The agent loop is the core workflow pattern for working effectively with an AI coding partner: **Gather Context $\rightarrow$ Act $\rightarrow$ Check**. Following this disciplined loop prevents hallucinations, catches errors early, and ensures that software changes are accurate, robust, and verifiable.

---

## 1. Gather Context

Before taking action or generating code, the agent inspects the environment, reads existing code, analyzes errors, and gathers necessary project context.

### Labeled Moment 1: Diagnosing Missing Remotes & Starter Templates
- **What Happened**: When trying to set up the repository and pull the starter template, the remote URL contained template placeholders (`<YOUR_GITHUB_USERNAME>`) and copying artifacts. Furthermore, running `git pull origin main` returned `remote: Repository not found`.
- **How Context Was Gathered**: 
  - Ran `git remote -v` and `git config -l` to inspect the local Git configuration.
  - Queried the GitHub API for user `EdrenZaga` to check public repositories.
  - Inspected the local filesystem and discovered the course starter files already downloaded in `~/Downloads/systems-starter/`.
- **Key Takeaway**: Instead of blindly executing commands or guessing filenames, gathering context from the local disk and system state uncovered the exact repository structure and prevented errors.

---

## 2. Act

Once context has been thoroughly established, the agent takes direct, targeted, and minimal action to complete the user's objective.

### Labeled Moment 2: Implementing and Incrementally Updating Applications
- **What Happened**: Built the `todo` web app with filtering, task completion, and localStorage, followed by the `pomodoro` study timer. Later, updated the Pomodoro app twice to add custom mode buttons (`Focus (25m)`, `Short Break (5m)`, `Long Break (15m)`), a session counter, a dark mode toggle, and a gentle Web Audio API chime.
- **How Action Was Taken**:
  - Structured clean HTML with semantic tags, SVG circular timer progress, and accessible controls.
  - Styled modular CSS custom properties supporting both light and dark themes with smooth transitions.
  - Wrote focused JavaScript using the Web Audio API (`AudioContext`, sine wave oscillators) and persistent state management (`localStorage`).
- **Key Takeaway**: Taking incremental, well-scoped actions makes changes easy to understand, test, and adapt.

---

## 3. Check

Action is never complete until it has been verified. The check phase closes the feedback loop and confirms that the implementation matches expectations without side effects or syntax errors.

### Labeled Moment 3: Syntax Validation and Git Clean State Verification
- **What Happened**: Verified that both the To-Do and Pomodoro applications were completely error-free and that all files were tracked and clean in Git.
- **How Verification Was Done**:
  - Re-read all written files (`index.html`, `style.css`, `script.js` across both apps) from disk to confirm markup and asset linking.
  - Ran Node.js syntax checks (`node -c todo/script.js` and `node -c pomodoro/script.js`) which exited with code `0`.
  - Captured verification screenshots (`todo.png` and `app-2.png`).
  - Ran `git status` after staging and committing to ensure the working tree was completely clean.
- **Key Takeaway**: Verification ensures that code doesn't just look right—it runs without runtime or syntax errors before being handed off or deployed.
