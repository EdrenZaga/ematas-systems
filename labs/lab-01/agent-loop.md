# The Agent Loop

The agent loop is the core workflow pattern for working effectively with an AI coding partner: **Gather Context $\rightarrow$ Act $\rightarrow$ Check**. Following this disciplined loop prevents hallucinations, minimizes errors, and ensures that software changes are accurate, robust, and verifiable.

---

## 1. Gather Context

Before writing any code or modifying existing files, the agent must gather accurate context about the environment, repository state, project structure, and task requirements.

- **Inspect the Workspace**: Read existing project files, directory layouts, configuration files, and documentation rather than assuming how a project is set up.
- **Check State**: Run diagnostic commands (such as `pwd`, `git status`, or `git remote -v`) to understand what exists, what branch is checked out, and what tools are available.
- **Identify Gaps and Ambiguities**: Look for placeholders, missing dependencies, or unconfigured settings (such as Git credentials or remote URLs) before proceeding.
- **Lab 1 Application**: 
  - Checked `git remote -v` to determine if a remote origin was configured.
  - Located the downloaded starter template in `~/Downloads/systems-starter/` when resolving the initial project setup.
  - Clarified and identified username and email configurations before performing Git operations.

---

## 2. Act

Once context has been established, the agent takes direct, targeted, and minimal actions to advance the user's objective.

- **Write Clean, Idiomatic Code**: Produce complete, robust implementations rather than placeholders or partial snippets.
- **Keep Changes Scoped**: Focus strictly on the requirements requested by the user, adhering to clean architecture and project standards.
- **Run Purposeful Commands**: Execute single, well-defined commands in the terminal with appropriate environment considerations.
- **Lab 1 Application**:
  - Implemented the To-Do list web app (`todo/index.html`, `todo/style.css`, `todo/script.js`) with task addition, strikethrough completion, deletion, filters, and local storage persistence.
  - Implemented the Pomodoro study timer app (`pomodoro/index.html`, `pomodoro/style.css`, `pomodoro/script.js`) with 25-minute countdown, mode switching, dark mode toggle, and a gentle Web Audio API beep.
  - Configured Git remotes and staged repository files.

---

## 3. Check

Action is never complete until it has been verified. The check phase closes the feedback loop and confirms that the implementation matches expectations without side effects.

- **Read Back Modified Files**: Re-read written files from disk to confirm formatting, structure, and integrity.
- **Run Syntax & Linter Checks**: Execute validation tools (e.g., `node -c` for JavaScript syntax validation) to catch syntax errors before runtime.
- **Verify Asset Linking & Selectors**: Confirm that relative links (`<link>`, `<script>`) and DOM element identifiers match between HTML, CSS, and JS.
- **Confirm Working Tree & Status**: Run `git status` or automated tests to verify clean working directories and passing builds.
- **Lab 1 Application**:
  - Read back `todo/index.html`, `todo/style.css`, and `todo/script.js` to ensure proper linking and syntax.
  - Tested JavaScript syntax using `node -c` on both `todo/script.js` and `pomodoro/script.js`.
  - Verified dark mode classes, audio API oscillators, and button bindings.
  - Ran `git status` to verify staged changes and untracked file handling.
