/**
 * Highlander Gold & Silver — Collection Grid & Structured Product Browsing
 * Follows the clean, structured item-display approach of Armorer with precious-metals elegance.
 */

import { icons } from './icons.js';
import { openItemModal } from './itemModal.js';

let allItems = [];
let filteredItems = [];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'lot-asc';

export function initCollection(items) {
  allItems = [...items];
  filteredItems = [...items];

  setupToolbarEvents();
  renderCategoryPills();
  applyFiltersAndRender();
}

function setupToolbarEvents() {
  const searchInput = document.getElementById('collectionSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const sortSelect = document.getElementById('collectionSortSelect');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }
      }
      applyFiltersAndRender();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.remove('visible');
        applyFiltersAndRender();
      }
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetAllFilters);
  }
}

function renderCategoryPills() {
  const container = document.getElementById('categoryPillsContainer');
  if (!container) return;

  // Extract unique categories from items
  const categories = ['all', ...Array.from(new Set(allItems.map(item => item.category)))];

  container.innerHTML = categories.map(cat => {
    const isAll = cat === 'all';
    const label = isAll ? 'All Pieces' : cat;
    const count = isAll ? allItems.length : allItems.filter(i => i.category === cat).length;
    return `
      <button 
        type="button" 
        class="category-pill ${activeCategory === cat ? 'active' : ''}" 
        data-category="${cat}"
      >
        ${label} <span style="opacity: 0.65; font-size: 0.65rem;">(${count})</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFiltersAndRender();
    });
  });
}

export function resetAllFilters() {
  activeCategory = 'all';
  searchQuery = '';
  currentSort = 'lot-asc';

  const searchInput = document.getElementById('collectionSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const sortSelect = document.getElementById('collectionSortSelect');

  if (searchInput) searchInput.value = '';
  if (clearSearchBtn) clearSearchBtn.classList.remove('visible');
  if (sortSelect) sortSelect.value = 'lot-asc';

  const container = document.getElementById('categoryPillsContainer');
  if (container) {
    container.querySelectorAll('.category-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.category === 'all');
    });
  }

  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  // 1. Filter by category
  let result = allItems.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    return true;
  });

  // 2. Filter by search query
  if (searchQuery) {
    result = result.filter(item => {
      const haystack = [
        item.lotNumber,
        item.title,
        item.description,
        item.category,
        item.grade || '',
        item.purity || '',
        item.priceFormatted
      ].join(' ').toLowerCase();

      return haystack.includes(searchQuery);
    });
  }

  // 3. Sort items
  result.sort((a, b) => {
    switch (currentSort) {
      case 'lot-asc':
        return Number(a.lotNumber) - Number(b.lotNumber);
      case 'lot-desc':
        return Number(b.lotNumber) - Number(a.lotNumber);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  filteredItems = result;
  updateFeedbackBar();
  renderGrid();
}

function updateFeedbackBar() {
  const countEl = document.getElementById('itemsInViewCount');
  const totalCountEl = document.getElementById('totalArchiveCount');
  const resetBtn = document.getElementById('resetFiltersBtn');

  if (countEl) countEl.textContent = filteredItems.length;
  if (totalCountEl) totalCountEl.textContent = allItems.length;

  const hasActiveFilter = activeCategory !== 'all' || searchQuery.length > 0;
  if (resetBtn) {
    resetBtn.style.display = hasActiveFilter ? 'inline-flex' : 'none';
  }
}

function renderGrid() {
  const grid = document.getElementById('collectionGrid');
  if (!grid) return;

  if (filteredItems.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; background: #FFFFFF; border: 1px solid var(--color-silver-border); border-radius: var(--radius-sm); padding: 3.5rem 2rem; text-align: center; box-shadow: var(--shadow-sm);">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(58, 15, 52, 0.05); border: 1px solid var(--color-silver); display: inline-flex; align-items: center; justify-content: center; color: var(--color-aubergine); margin-bottom: 1rem;">
          ${icons.search(24)}
        </div>
        <h3 style="color: var(--color-aubergine); font-family: var(--font-serif); font-size: 1.4rem; margin-bottom: 0.5rem;">
          No Matching Precious Metals Found
        </h3>
        <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 1.5rem auto; font-size: 0.9rem;">
          We couldn't find any inventory matching your search criteria. Try modifying your search term or clearing active filters.
        </p>
        <button type="button" class="btn btn-primary" id="emptyStateResetBtn">
          ${icons.refresh(15)}
          Reset All Filters
        </button>
      </div>
    `;

    const emptyBtn = document.getElementById('emptyStateResetBtn');
    if (emptyBtn) emptyBtn.addEventListener('click', resetAllFilters);
    return;
  }

  grid.innerHTML = filteredItems.map(item => createCardMarkup(item)).join('');

  // Attach card click handlers
  grid.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const found = allItems.find(i => i.id === id);
      if (found) {
        openItemModal(found);
      }
    });

    // Keyboard enter key
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.dataset.id;
        const found = allItems.find(i => i.id === id);
        if (found) openItemModal(found);
      }
    });
  });
}

/**
 * Creates the item card markup strictly per prompt requirement:
 * Each item should primarily display only:
 * 1. Item number.
 * 2. Item description.
 * 3. Cost or listed price.
 * No repetitive business info (Highlander Gold & Silver, Bigfork MT, Shipping Available).
 */
function createCardMarkup(item) {
  return `
    <article 
      class="item-card" 
      data-id="${item.id}"
      tabindex="0"
      aria-label="Lot ${item.lotNumber}: ${escapeHtml(item.title)}"
    >
      <!-- Media Box with Lot Badge -->
      <div class="card-media-box">
        <div class="lot-number-badge">
          <span class="lot-badge-text">Item # ${item.lotNumber}</span>
        </div>

        <div class="category-tag-badge">
          ${item.category}
        </div>

        <img 
          src="${item.featuredImage}" 
          alt="${escapeHtml(item.title)}" 
          class="card-img"
          loading="lazy"
        />
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <h3 class="card-title" title="${escapeHtml(item.title)}">
          ${escapeHtml(item.title)}
        </h3>

        <!-- Item Description -->
        <p class="card-description-preview">
          ${escapeHtml(item.lead || item.description)}
        </p>

        <!-- Technical numismatic pills -->
        <div class="card-spec-tags">
          ${item.grade ? `<span class="spec-pill spec-pill-gold">${escapeHtml(item.grade)}</span>` : ''}
          ${item.purity ? `<span class="spec-pill">${escapeHtml(item.purity)}</span>` : ''}
        </div>

        <!-- Footer: Cost or listed price & Inspect CTA -->
        <div class="card-footer">
          <div class="card-price-box">
            <span class="price-label">Price / Value</span>
            <span class="price-amount">${item.priceFormatted}</span>
          </div>

          <span class="card-action-link">
            Inspect Item
            ${icons.arrowRight(14)}
          </span>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
