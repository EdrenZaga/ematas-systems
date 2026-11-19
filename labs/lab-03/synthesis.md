# Discovery Synthesis

> **Verification Note:** 2 unsupported claims removed after cross-checking against raw interview notes.

---

## 1. Supported Insights (Grounded in Evidence)

- **High Abandonment Due to Friction (`[did]` evidence)**: Users consistently abandon dedicated tracking applications (like Toggl Track) within a week when timers require manual stopping or complex category tagging. Leaving a timer running accidentally invalidates the data and causes users to quit entirely.
- **Willingness to Invest in Focus (`[paid]` evidence)**: Students are willing to pay out-of-pocket (e.g., $3.99 for the Forest app) for solutions that provide immediate barriers against digital distractions.
- **Preference for Physical/Low-Friction Simplicity (`[did]` evidence)**: When digital tools become cumbersome, users regress to physical timers (kitchen timers) or unformatted Apple Notes checklists.
- **Need for Low Overhead (`[said]` evidence)**: Users express strong interest in zero-setup tools that require no lengthy authentication or onboarding flow.

---

## 2. Unsupported Claims (Caught During Fact-Checking)

The initial automated AI synthesis proposed the following claims, which were audited and rejected because they have no basis in the raw interview transcripts:

1. ~~**Claim 1**: "Students expressed strong willingness to pay an ongoing $9.99/month subscription fee for an AI-powered study analytics dashboard."~~
   - *Audit reason*: Unsupported. The raw interview showed only a single, one-time $3.99 mobile app purchase. The interviewee never agreed to or mentioned a recurring subscription model.
2. ~~**Claim 2**: "Interviewees requested automated calendar synchronization with Gonzaga Zagweb and Canvas Course LMS schedules."~~
   - *Audit reason*: Unsupported. The interviewee never mentioned Zagweb or Canvas integration during the session. This was an unprompted hallucination added during initial synthesis.

---

## 3. Core System Requirements Derived from Validated Findings
- **Single-click start and stop** with instant recovery.
- **Automatic idle detection / max-session caps** to prevent 8-hour accidental timer overflow when users walk away.
- **Client-side instant persistence** so students never lose study session records upon closing the tab.
