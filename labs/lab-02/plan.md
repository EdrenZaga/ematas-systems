# Plan: Problem Tracker Web Application

## 1. System Overview & Objectives
The **Problem Tracker** is a client-side issue and defect management system designed for small software development teams. Unlike the initial one-shot implementation, this system is built systematically through checkable, modular milestones with clear data contracts, strict UI component hierarchies, and automated persistence.

### Core Goals
- Allow team members to report problems with structured metadata (title, detailed description, severity, category, reporter, timestamp).
- Provide immediate visual distinction for severity levels (Low, Medium, High, Critical) and lifecycle states (Open, In Progress, Resolved).
- Offer comprehensive filtering (by status, severity, category) and live keyword searching.
- Maintain a live statistics overview (total, open, in-progress, resolved counts).
- Persist state safely across browser reloads using `localStorage`.
- Enforce strict AI agent governance through a scoped `CLAUDE.md` and unbreakable permission rules in `.claude/settings.json`.

---

## 2. Architecture & Data Model

### Data Contract (`Problem` Object)
```typescript
interface Problem {
  id: string;              // Unique timestamp identifier
  title: string;           // Brief summary (min 5 characters)
  description: string;     // Detailed steps/observations
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Bug' | 'Feature Request' | 'UI/UX' | 'Performance' | 'Security';
  status: 'Open' | 'In Progress' | 'Resolved';
  reporter: string;        // Name or team role
  createdAt: string;       // ISO 8601 string
  updatedAt: string;       // ISO 8601 string
}
```

### Component Hierarchy
```text
problem-tracker/
├── index.html          # Semantic layout & accessible ARIA bindings
├── style.css           # Modern design system (CSS variables, responsive grid)
├── script.js           # Modular state store, event dispatchers, DOM renderer
├── CLAUDE.md           # Scoped project rules, constraints, and test commands
└── .claude/
    └── settings.json   # Enforced deny/ask permission boundary
```

---

## 3. Implementation Phases

### Phase 1: Foundation & Project Governance
- Define `CLAUDE.md` specifying:
  - Stack: Vanilla ES6+, CSS3 custom properties, HTML5 semantics.
  - Prohibited actions: Never commit sensitive keys, avoid external CDNs for core features.
  - Required validation: Verify syntax with `node -c script.js` prior to committing.
- Configure `.claude/settings.json` with strict permissions:
  - Deny: Destructive filesystem actions (`rm *`), force pushes (`git push --force *`), reading `.env*` or `secrets/**`.
  - Ask: Standard remote pushes.

### Phase 2: User Interface & Design System
- Modern dashboard layout:
  - Top header with status metrics cards (Total, Active, In Progress, Resolved).
  - Collapsible/prominent "Report Problem" modal or sliding panel.
  - Multi-criteria filter toolbar: Status pills, severity dropdown, search bar.
  - Responsive issue grid/cards with color-coded severity badges and status transitions.

### Phase 3: State Management & Persistence
- Single Source of Truth (`state` object in `script.js`):
  - `problems`: Array of `Problem` objects.
  - `filters`: Current active filters (`status`, `severity`, `searchQuery`).
- LocalStorage synchronization:
  - Read on application mount with graceful fallback to sample starter defects.
  - Save on every state mutation (create, status update, delete).

### Phase 4: Interaction & Defensive UX
- Form validation: Sanitize input strings to prevent XSS.
- Confirmation dialogs: Prevent accidental deletion.
- Empty state graphics/messages when search or filters return zero matches.

### Phase 5: Verification & Deployment Preparation
- Verify code syntax and DOM event binding integrity.
- Prepare `vercel.json` and static routing for deployment to Vercel.

---

## 4. Test & Verification Plan
1. **Creation Test**: Submit a valid problem and confirm it appears in the list and increments the summary counter.
2. **Filter Test**: Filter by "Critical" and "Open" to verify that only matching issues are displayed.
3. **Search Test**: Type a substring of an existing title into the search box and verify real-time narrowing.
4. **Status Transition Test**: Transition a problem from "Open" $\rightarrow$ "In Progress" $\rightarrow$ "Resolved" and check that badge styles update immediately.
5. **Persistence Test**: Reload the browser page and verify that all problems and changes persist intact.
6. **Permission Test**: Confirm that destructive terminal commands are blocked by `.claude/settings.json`.
