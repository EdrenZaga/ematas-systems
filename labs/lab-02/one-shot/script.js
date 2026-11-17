let problems = JSON.parse(localStorage.getItem('oneshot_problems')) || [
  {
    id: 1,
    title: 'Navbar links broken on mobile',
    description: 'When viewing on screens smaller than 500px, menu does not open.',
    severity: 'High',
    category: 'UI',
    status: 'Open'
  },
  {
    id: 2,
    title: 'Database connection timeout under load',
    description: 'Intermittent 504 gateway timeout occurs during peak hours.',
    severity: 'Critical',
    category: 'Performance',
    status: 'In Progress'
  }
];

const form = document.getElementById('problem-form');
const list = document.getElementById('problem-list');
const filterSelect = document.getElementById('status-filter');

function saveProblems() {
  localStorage.setItem('oneshot_problems', JSON.stringify(problems));
}

function renderProblems() {
  const currentFilter = filterSelect.value;
  list.innerHTML = '';

  const filtered = problems.filter(p => {
    if (currentFilter === 'All') return true;
    return p.status === currentFilter;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<p class="empty-state">No problems found for this filter.</p>';
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = `problem-card ${p.severity}`;

    card.innerHTML = `
      <div class="problem-header">
        <span class="problem-title">${escapeHtml(p.title)}</span>
        <div class="badges">
          <span class="badge badge-severity">${escapeHtml(p.severity)}</span>
          <span class="badge badge-status ${p.status.replace(/\s+/g, '-')}">${escapeHtml(p.status)}</span>
        </div>
      </div>
      <p class="problem-desc">${escapeHtml(p.description)}</p>
      <div class="problem-actions">
        <div class="action-buttons">
          <button class="btn-small" onclick="updateStatus(${p.id}, 'Open')">Open</button>
          <button class="btn-small" onclick="updateStatus(${p.id}, 'In Progress')">In Progress</button>
          <button class="btn-small" onclick="updateStatus(${p.id}, 'Resolved')">Resolve</button>
        </div>
        <button class="btn-small btn-delete" onclick="deleteProblem(${p.id})">Delete</button>
      </div>
    `;

    list.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const severity = document.getElementById('severity').value;
  const category = document.getElementById('category').value;

  if (!title || !description) return;

  const newProblem = {
    id: Date.now(),
    title,
    description,
    severity,
    category,
    status: 'Open'
  };

  problems.push(newProblem);
  saveProblems();
  renderProblems();
  form.reset();
});

filterSelect.addEventListener('change', renderProblems);

window.updateStatus = function(id, newStatus) {
  const target = problems.find(p => p.id === id);
  if (target) {
    target.status = newStatus;
    saveProblems();
    renderProblems();
  }
};

window.deleteProblem = function(id) {
  problems = problems.filter(p => p.id !== id);
  saveProblems();
  renderProblems();
};

renderProblems();
