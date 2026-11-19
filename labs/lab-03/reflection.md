# Lab 3 Reflection: User Discovery and Requirements

## 1. Said / Did / Paid Counts and Evidence Reliability

In my practice interview notes, I recorded 4 said statements, 4 did statements, and 1 paid statement. Counting these categories made it immediately clear that people's stated opinions and future promises are often aspirational rather than reflective of real life. The fact that my interviewee actually paid $3.99 out of pocket for the Forest app and physically set a kitchen timer during study blocks provided far more credible evidence of their focus problems than their speculative comment that social leaderboards would motivate them. Relying on concrete past actions and real financial commitments prevents us from building systems around polite hypothetical preferences that users ultimately abandon.

---

## 2. Checking AI Synthesis Against Raw Notes

When I used the AI to synthesize my raw notes, it generated two significant claims that were completely fabricated: it asserted that students would pay a $9.99 monthly subscription for analytics and that users explicitly asked for Zagweb and Canvas LMS calendar integration. I caught these errors by performing a strict line-by-line verification comparing each bullet in the synthesis back to the numbered statements in my raw interview notes. Catching and striking through these unsupported claims proved how critical human auditing is, as building those hallucinated features would have wasted weeks of development effort on capabilities no user actually requested.

---

## 3. Riskiest Assumption and Small Test

The single riskiest assumption behind my project is that college students will consistently remember to click start and stop on a browser timer without giving up after three or four days, exactly as they did with Toggl Track and Notion. If students forget to stop a session when taking a lunch break or walking to class, corrupted time records will ruin their trust in the tool and lead to quick abandonment. To test this assumption this week, I am running a low-fidelity two-day test with two classmates in the library using a simple one-click prototype to observe whether they remember to log their breaks or require an automatic idle-timeout prompt.
