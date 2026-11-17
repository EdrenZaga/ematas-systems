# Lab 1 Reflection: Ship Your First App

*Complete each section below with your personal reflections and insights from Lab 1.*

---

## 1. What did you build in this lab?

In this lab, I built two responsive web applications inside `labs/lab-01`:
1. **To-Do List App** (`labs/lab-01/todo/`): An interactive task manager with task creation, strikethrough completion, individual deletion, filter tabs (All, Active, Completed), task counter, and automatic `localStorage` persistence.
2. **Pomodoro Study Timer** (`labs/lab-01/pomodoro/`): A modern study timer featuring a 25-minute countdown, custom modes for "Focus (25m)", "Short Break (5m)", and "Long Break (15m)", an SVG circular progress ring, a session counter tracking completed focus blocks, a dark mode toggle in the top corner, and a gentle Web Audio API chime when the countdown reaches 00:00.

---

## 2. What surprised you about working with an AI coding partner?

I was surprised by how quickly the AI could generate complete, working multi-file applications (HTML, CSS, JavaScript) from simple natural language prompts. Instead of writing boilerplate code from scratch, my role shifted toward high-level system analysis, clarifying requirements, and verifying that the output matched the specifications. It was also impressive how the agent utilized built-in browser APIs (like the Web Audio API oscillator) without requiring external audio files.

---

## 3. Where did the agent get stuck or make a mistake, and how did you guide it back on track?

We hit a roadblock early during the Git repository setup. The initial command had Markdown formatting artifacts and a placeholder (`<YOUR_GITHUB_USERNAME>`), and running `git pull origin main` failed with `repository not found`. 

To guide it back on track:
- I provided my actual GitHub username (`EdrenZaga`) and email (`ematas@zagmail.gonzaga.edu`).
- We identified that the course starter template was already downloaded locally in my `~/Downloads/systems-starter/` folder.
- I created the `ematas-systems` repository on GitHub so we could push our work upstream to `origin main`.

Providing clear input and context allowed the agent to resolve the issues quickly.

---

## 4. How does the "Gather Context -> Act -> Check" loop help you stay in control of the development process?

The loop ensures that changes are deliberate, tested, and verifiable rather than based on blind assumptions:
- **Gather Context**: Checking existing files, remotes, and local configuration prevents duplicate work and invalid commands.
- **Act**: Making focused, incremental changes makes it easy to isolate what was added or changed.
- **Check**: Validating syntax with `node -c`, re-reading files, and verifying `git status` confirms that everything works and that the working tree remains clean before moving forward.

---

## 5. What concepts, web development features, or developer tools do you want to explore further in upcoming labs?

In upcoming labs, I am excited to explore:
- Moving from vanilla web apps to full-stack frameworks like Next.js and Tailwind CSS.
- Working with real databases and authentication using Supabase.
- Automating deployment workflows with Vercel and connecting cloud services to our applications.
