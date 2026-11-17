// Problem Tracker State
const STORAGE_KEY = 'problem_tracker_data';

let problems = [];
let currentFilters = {
  status: 'All',
  severity: 'All',
  searchQuery: ''
};

// DOM References
const problemsContainer = document.getElementById('problems-container');
const emptyState = document.getElementById('empty-state');
const formPanel = document.getElementById('form-panel');
const problemForm = document.getElementById('problem-form');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const closeFormBtn = document.getElementById('close-form-btn');
const cancelFormBtn = document.getElementById('cancel-form-btn');

// Metric elements
const metricTotal = document.getElementById('metric-total');
const metricOpen = document.getElementById('metric-open');
const metricInProgress = document.getElementById('metric-in-progress');
const metricResolved = document.getElementById('metric-resolved');

// Filter elements
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const filterStatus = document.getElementById('filter-status');
const filterSeverity = document.getElementById('filter-severity');

// Default initial defects
const DEFAULT_PROBLEMS = [
  {
    id: 'prob-101',
    title: 'Payment webhook drops checkout session on retry',
    description: 'When third-party payment gateways retry a failed webhook, the order status defaults to pending rather than updated.',
    severity: 'Critical',
    category: 'Bug',
    status: 'In Progress',
    reporter: 'Alex Chen',
    createdAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString()
  },
  {
    id: 'prob-102',
    title: 'Mobile navigation dropdown overlaps content',
    description: 'On screens smaller than 600px width, expanding the hamburger menu cuts off the primary CTA button.',
    severity: 'Medium',
    category: 'UI/UX',
    status: 'Open',
    reporter: 'Taylor Swift',
    createdAt: new Date(Date.now() - 86400000).toLocaleDateString()
  },
  {
    id: 'prob-103',
    title: 'Database query slow on user profile load',
    description: 'N+1 query detected on user profile retrieval leading to 1.8s page load times.',
    severity: 'High',
    category: 'Performance',
    status: 'Open',
    reporter: 'Devin Martinez',
    createdAt: new Date(Date.now() - 3600000 * 5).toLocaleDateString()
  },
  {
    id: 'prob-104',
    title: 'Add export to CSV for sprint problem reports',
    description: 'Team leads need to export weekly resolved defects into CSV format for retrospective meetings.',
    severity: 'Low',
    category: 'Feature',
    status: 'Resolved',
    reporter: 'Jordan Reed',
    createdAt: new Date(Date.now() - 86400000 * 4).toLocaleDateString()
  }
];

// Load from LocalStorage
function loadProblems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      problems = JSON.parse(raw);
    } else {
      problems = [...DEFAULT_PROBLEMS];
      saveProblems();
    }
  } catch (err) {
    console.error('Error loading problems from storage:', err);
    problems = [...DEFAULT_PROBLEMS];
  }
}

// Save to LocalStorage
function saveProblems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
}

// HTML Escaping to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Update dashboard metrics
function updateMetrics() {
  const total = problems.length;
  const openCount = problems.filter(p => p.status === 'Open').length;
  const inProgressCount = problems.filter(p => p.status === 'In Progress').length;
  const resolvedCount = problems.filter(p => p.status === 'Resolved').length;

  metricTotal.textContent = total;
  metricOpen.textContent = openCount;
  metricInProgress.textContent = inProgressCount;
  metricResolved.textContent = resolvedCount;
}

// Filter problems
function getFilteredProblems() {
  return problems.filter(item => {
    // Status filter
    if (currentFilters.status !== 'All' && item.status !== currentFilters.status) {
      return false;
    }
    // Severity filter
    if (currentFilters.severity !== 'All' && item.severity !== currentFilters.severity) {
      return false;
    }
    // Search query
    if (currentFilters.searchQuery) {
      const q = currentFilters.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchReporter = item.reporter.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchReporter && !matchCat) {
        return false;
      }
    }
    return true;
  });
}

// Render problems to DOM
function renderProblems() {
  updateMetrics();
  const filtered = getFilteredProblems();
  problemsContainer.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = `problem-card sev-${p.severity}`;
    card.dataset.id = p.id;

    card.innerHTML = `
      <div class="card-top">
        <div class="card-title-group">
          <h3 class="card-title">${escapeHtml(p.title)}</h3>
          <div class="card-badges">
            <span class="badge badge-severity ${escapeHtml(p.severity)}">${escapeHtml(p.severity)}</span>
            <span class="badge badge-category">${escapeHtml(p.category)}</span>
            <span class="badge badge-status ${escapeHtml(p.status.replace(/\s+/g, '-'))}">${escapeHtml(p.status)}</span>
          </div>
        </div>
      </div>

      <p class="card-desc">${escapeHtml(p.description)}</p>

      <div class="card-footer">
        <div class="card-meta">
          <span>Reported by <strong>${escapeHtml(p.reporter)}</strong></span>
          <span>• ${escapeHtml(p.createdAt)}</span>
        </div>
        <div class="card-controls">
          <label for="status-${p.id}" class="sr-only" style="display:none">Update Status</label>
          <select id="status-${p.id}" class="status-select" data-id="${p.id}" aria-label="Change status">
            <option value="Open" ${p.status === 'Open' ? 'selected' : ''}>Open</option>
            <option value="In Progress" ${p.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Resolved" ${p.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
          </select>
          <button type="button" class="btn-card-delete" data-id="${p.id}" aria-label="Delete problem" title="Delete Problem">
            🗑️
          </button>
        </div>
      </div>
    `;

    problemsContainer.appendChild(card);
  });
}

// Add Problem
function addProblem(data) {
  const newProblem = {
    id: 'prob-' + Date.now(),
    title: data.title.trim(),
    description: data.description.trim(),
    severity: data.severity,
    category: data.category,
    status: 'Open',
    reporter: data.reporter.trim(),
    createdAt: new Date().toLocaleDateString()
  };

  problems.unshift(newProblem);
  saveProblems();
  renderProblems();
}

// Update Status
function updateStatus(id, newStatus) {
  const target = problems.find(p => p.id === id);
  if (target) {
    target.status = newStatus;
    saveProblems();
    renderProblems();
  }
}

// Delete Problem
function deleteProblem(id) {
  const target = problems.find(p => p.id === id);
  if (!target) return;

  if (confirm(`Are you sure you want to delete problem: "${target.title}"?`)) {
    problems = problems.filter(p => p.id !== id);
    saveProblems();
    renderProblems();
  }
}

// Form visibility toggles
function openForm() {
  formPanel.classList.remove('hidden');
  document.getElementById('problem-title').focus();
  toggleFormBtn.disabled = true;
}

function closeForm() {
  formPanel.classList.add('hidden');
  problemForm.reset();
  toggleFormBtn.disabled = false;
}

// Event Listeners
toggleFormBtn.addEventListener('click', openForm);
closeFormBtn.addEventListener('click', closeForm);
cancelFormBtn.addEventListener('click', closeForm);

problemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('problem-title').value;
  const description = document.getElementById('problem-desc').value;
  const severity = document.getElementById('problem-severity').value;
  const category = document.getElementById('problem-category').value;
  const reporter = document.getElementById('problem-reporter').value;

  if (!title || !description || !reporter) return;

  addProblem({ title, description, severity, category, reporter });
  closeForm();
});

// Search input handling
searchInput.addEventListener('input', (e) => {
  currentFilters.searchQuery = e.target.value.trim();
  if (currentFilters.searchQuery) {
    clearSearchBtn.classList.remove('hidden');
  } else {
    clearSearchBtn.classList.add('hidden');
  }
  renderProblems();
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  currentFilters.searchQuery = '';
  clearSearchBtn.classList.add('hidden');
  renderProblems();
});

// Dropdown filters
filterStatus.addEventListener('change', (e) => {
  currentFilters.status = e.target.value;
  renderProblems();
});

filterSeverity.addEventListener('change', (e) => {
  currentFilters.severity = e.target.value;
  renderProblems();
});

// Event Delegation for Problem Cards (Status changes and Delete)
problemsContainer.addEventListener('change', (e) => {
  if (e.target.classList.contains('status-select')) {
    const id = e.target.dataset.id;
    const newStatus = e.target.value;
    updateStatus(id, newStatus);
  }
});

problemsContainer.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.btn-card-delete');
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    deleteProblem(id);
  }
});

// Initial boot
loadProblems();
renderProblems();
