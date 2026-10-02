/* ============================================================
   bartaco Recipe Book — app logic
   Vanilla JS. Loads recipes.json, renders responsive list.
   Narrow: accordion. Wide (>=600px): master-detail.
   ============================================================ */

(() => {
  'use strict';

  const WIDE_QUERY = window.matchMedia('(min-width: 600px)');
  const THEME_KEY = 'bt_theme';

  const els = {
    search: document.getElementById('search'),
    filters: document.getElementById('filters'),
    list: document.getElementById('list'),
    detail: document.getElementById('detail'),
    placeholder: document.getElementById('placeholder'),
    detailContent: document.getElementById('detailContent'),
    settings: document.getElementById('settings'),
    settingsBtn: document.getElementById('settingsBtn'),
    settingsClose: document.getElementById('settingsClose'),
    themeToggle: document.getElementById('themeToggle'),
  };

  const state = {
    recipes: [],
    filtered: [],
    query: '',
    category: 'all',
    selectedId: null,   // used in wide mode
  };

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1e1e22' : '#2A4A7C');
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved);
    if (els.themeToggle) els.themeToggle.checked = saved === 'dark';
  }
  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  /* ---------- Helpers ---------- */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatAmount(ing) {
    const parts = [];
    if (ing.amount !== null && ing.amount !== undefined && ing.amount !== '') {
      parts.push(String(ing.amount));
    }
    if (ing.unit !== null && ing.unit !== undefined && ing.unit !== '') {
      parts.push(String(ing.unit));
    }
    return parts.join(' ');
  }

  function prettyCategory(cat) {
    return cat ? cat.replace(/\b\w/g, (c) => c.toUpperCase()) : '';
  }

  /* ---------- Build detail markup ---------- */
  function detailHtml(r) {
    let html = '';

    html += `<div class="rd-hero"><img src="${escapeHtml(r.image)}" alt="${escapeHtml(r.name)}" loading="lazy" /></div>`;
    html += `<h2 class="rd-title">${escapeHtml(r.name)}</h2>`;
    if (r.glass) {
      html += `<span class="rd-glass">${escapeHtml(r.glass)}</span>`;
    }

    // Ingredients
    if (Array.isArray(r.ingredients) && r.ingredients.length) {
      html += '<div class="rd-section"><h3>Ingredients</h3><ul class="ingredients">';
      for (const ing of r.ingredients) {
        const amt = formatAmount(ing);
        html += '<li>';
        html += `<span class="ing-amount">${escapeHtml(amt)}</span>`;
        html += `<span class="ing-item">${escapeHtml(ing.item || '')}</span>`;
        html += '</li>';
      }
      html += '</ul></div>';
    }

    // Instructions
    if (Array.isArray(r.instructions) && r.instructions.length) {
      html += '<div class="rd-section"><h3>Instructions</h3><ol class="steps">';
      for (const step of r.instructions) {
        html += `<li>${escapeHtml(step)}</li>`;
      }
      html += '</ol></div>';
    }

    // Garnish
    if (Array.isArray(r.garnish) && r.garnish.length) {
      html += '<div class="rd-section"><h3>Garnish</h3><ul class="garnish-list">';
      for (const g of r.garnish) {
        html += `<li>${escapeHtml(g)}</li>`;
      }
      html += '</ul></div>';
    }

    // Notes
    if (r.notes) {
      html += `<p class="notes">${escapeHtml(r.notes)}</p>`;
    }

    return html;
  }

  /* ---------- Render list ---------- */
  function render() {
    const list = els.list;
    list.innerHTML = '';

    if (!state.filtered.length) {
      const li = document.createElement('li');
      li.className = 'empty-msg';
      li.textContent = 'No drinks match your search.';
      list.appendChild(li);
      return;
    }

    const frag = document.createDocumentFragment();

    for (const r of state.filtered) {
      const li = document.createElement('li');

      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = r.id;
      card.setAttribute('aria-expanded', 'false');
      if (state.selectedId === r.id) card.classList.add('selected');

      // Head (button)
      const head = document.createElement('button');
      head.className = 'card-head';
      head.type = 'button';
      head.innerHTML =
        `<span class="thumb"><img src="${escapeHtml(r.image)}" alt="${escapeHtml(r.name)}" loading="lazy" /></span>` +
        `<span class="card-title"><h3 class="card-name">${escapeHtml(r.name)}</h3>` +
        `<p class="card-cat">${escapeHtml(prettyCategory(r.category))}</p></span>` +
        `<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.4 5.6 9 7 7.6l5 5 5-5L18.4 9 12 15.4Z"/></svg>`;

      // Body (accordion, narrow only)
      const body = document.createElement('div');
      body.className = 'card-body';
      body.innerHTML =
        `<div class="card-body-inner"><div class="recipe-detail">${detailHtml(r)}</div></div>`;

      head.addEventListener('click', () => onCardClick(r, card));

      card.appendChild(head);
      card.appendChild(body);
      li.appendChild(card);
      frag.appendChild(li);
    }

    list.appendChild(frag);

    // In wide mode, keep detail pane in sync
    if (WIDE_QUERY.matches) {
      if (state.selectedId) {
        const sel = state.filtered.find((x) => x.id === state.selectedId);
        if (sel) showDetail(sel);
        else showPlaceholder();
      } else {
        showPlaceholder();
      }
    }
  }

  /* ---------- Interaction ---------- */
  function onCardClick(recipe, cardEl) {
    if (WIDE_QUERY.matches) {
      // Master-detail: select and fill right pane
      state.selectedId = recipe.id;
      for (const c of els.list.querySelectorAll('.card')) {
        c.classList.toggle('selected', c.dataset.id === recipe.id);
      }
      showDetail(recipe);
    } else {
      // Accordion: toggle this card, close others
      const isOpen = cardEl.getAttribute('aria-expanded') === 'true';
      for (const c of els.list.querySelectorAll('.card')) {
        c.setAttribute('aria-expanded', 'false');
      }
      cardEl.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (!isOpen) {
        // scroll the opened card into comfortable view
        requestAnimationFrame(() => {
          cardEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
      }
    }
  }

  function showDetail(recipe) {
    els.placeholder.hidden = true;
    els.detailContent.hidden = false;
    els.detailContent.innerHTML = detailHtml(recipe);
    els.detail.scrollTop = 0;
  }

  function showPlaceholder() {
    els.detailContent.hidden = true;
    els.detailContent.innerHTML = '';
    els.placeholder.hidden = false;
  }

  /* ---------- Filtering ---------- */
  function applyFilters() {
    const q = state.query.trim().toLowerCase();
    state.filtered = state.recipes.filter((r) => {
      if (state.category !== 'all' && r.category !== state.category) return false;
      if (!q) return true;
      if (r.name.toLowerCase().includes(q)) return true;
      if (Array.isArray(r.ingredients)) {
        for (const ing of r.ingredients) {
          if (ing.item && ing.item.toLowerCase().includes(q)) return true;
        }
      }
      return false;
    });

    // Keep selection valid
    if (state.selectedId && !state.filtered.some((r) => r.id === state.selectedId)) {
      state.selectedId = null;
    }
    render();
  }

  /* ---------- Category chips ---------- */
  function buildFilters() {
    const cats = ['all', ...Array.from(new Set(state.recipes.map((r) => r.category)))];
    els.filters.innerHTML = '';
    for (const cat of cats) {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', cat === state.category ? 'true' : 'false');
      btn.dataset.cat = cat;
      btn.textContent = cat === 'all' ? 'All' : prettyCategory(cat);
      btn.addEventListener('click', () => {
        state.category = cat;
        for (const c of els.filters.querySelectorAll('.chip')) {
          c.setAttribute('aria-selected', c.dataset.cat === cat ? 'true' : 'false');
        }
        applyFilters();
      });
      els.filters.appendChild(btn);
    }
  }

  /* ---------- Settings sheet ---------- */
  function openSettings() {
    els.settings.hidden = false;
    document.addEventListener('keydown', onEscClose);
  }
  function closeSettings() {
    els.settings.hidden = true;
    document.removeEventListener('keydown', onEscClose);
  }
  function onEscClose(e) {
    if (e.key === 'Escape') closeSettings();
  }

  /* ---------- Load data ---------- */
  async function loadRecipes() {
    try {
      const res = await fetch('data/recipes.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.recipes = Array.isArray(data) ? data : [];
      buildFilters();
      applyFilters();
    } catch (err) {
      els.list.innerHTML =
        `<li class="empty-msg">Couldn't load recipes.<br><small>${escapeHtml(err.message)}</small></li>`;
      console.error('Failed to load recipes:', err);
    }
  }

  /* ---------- Mode switch handling ---------- */
  function onModeChange() {
    // Reset UI state cleanly when crossing the breakpoint
    for (const c of els.list.querySelectorAll('.card')) {
      c.setAttribute('aria-expanded', 'false');
    }
    if (WIDE_QUERY.matches) {
      if (state.selectedId) {
        const sel = state.recipes.find((r) => r.id === state.selectedId);
        if (sel) showDetail(sel);
        else showPlaceholder();
      } else {
        showPlaceholder();
      }
    } else {
      // Narrow: detail pane is hidden via CSS; nothing to do
      showPlaceholder();
    }
  }

  /* ---------- Service worker ---------- */
  function registerSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch((e) => {
          console.warn('SW registration failed:', e);
        });
      });
    }
  }

  /* ---------- Wire up ---------- */
  function init() {
    initTheme();

    els.search.addEventListener('input', (e) => {
      state.query = e.target.value;
      applyFilters();
    });

    els.settingsBtn.addEventListener('click', openSettings);
    els.settingsClose.addEventListener('click', closeSettings);
    els.settings.addEventListener('click', (e) => {
      if (e.target === els.settings) closeSettings(); // backdrop click
    });
    els.themeToggle.addEventListener('change', (e) => {
      setTheme(e.target.checked ? 'dark' : 'light');
    });

    if (WIDE_QUERY.addEventListener) {
      WIDE_QUERY.addEventListener('change', onModeChange);
    } else if (WIDE_QUERY.addListener) {
      WIDE_QUERY.addListener(onModeChange); // older Safari
    }

    loadRecipes();
    registerSW();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
