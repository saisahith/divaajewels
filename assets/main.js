/* DIVAA JEWELS - main.js (Shopify Edition) */

function getDataList(element, key) {
  return String(element.dataset[key] || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function updateCollectionVisibleCount(visibleCount) {
  document.querySelectorAll('[data-visible-product-count]').forEach((countEl) => {
    const label = visibleCount === 1 ? 'product' : 'products';
    countEl.textContent = `${visibleCount} ${label}`;
  });
}

function updateFilteredEmptyState(visibleCount, hasActiveFilter) {
  document.querySelectorAll('[data-filter-empty]').forEach((emptyState) => {
    emptyState.hidden = !(hasActiveFilter && visibleCount === 0);
  });
}

function syncDivaaFilterAccordions(scope) {
  const root = scope || document;

  root.querySelectorAll('[data-filter-accordion]').forEach((accordion) => {
    const summary = accordion.querySelector('summary');
    if (!summary) return;

    summary.setAttribute('role', 'button');
    summary.setAttribute('aria-expanded', accordion.open ? 'true' : 'false');

    if (!accordion.dataset.accordionBound) {
      accordion.dataset.accordionBound = 'true';
      accordion.addEventListener('toggle', () => {
        summary.setAttribute('aria-expanded', accordion.open ? 'true' : 'false');
      });
    }
  });
}

function initCarbonFilterAccordions(scope) {
  const root = scope || document;

  root.querySelectorAll('[data-carbon-filter-trigger]').forEach((button) => {
    const panelId = button.getAttribute('aria-controls');
    const panel = panelId ? root.querySelector(`#${CSS.escape(panelId)}`) || document.getElementById(panelId) : null;
    if (!panel) return;

    function setExpanded(expanded) {
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      panel.hidden = !expanded;
    }

    setExpanded(button.getAttribute('aria-expanded') === 'true');

    if (!button.dataset.carbonAccordionBound) {
      button.dataset.carbonAccordionBound = 'true';
      button.addEventListener('click', () => {
        setExpanded(button.getAttribute('aria-expanded') !== 'true');
      });
    }
  });
}

function initDivaaNewArrivalsFilters() {
  const params = new URLSearchParams(window.location.search);
  const selectedType = params.get('type');
  const selectedSubcategory = params.get('subcategory');

  const basePath = '/collections/new-arrivals';
  const typeLabels = {
    'necklace-sets': 'Necklace Sets',
    'earrings': 'Earrings',
    'bangles-bracelets': 'Bangles & Bracelets',
    'rings': 'Rings',
    'bridal-accessories': 'Bridal Accessories',
    'sarees': 'Sarees',
    'lehengas': 'Lehengas',
    'dresses-gowns': 'Dresses / Gowns'
  };
  const subcategoryLabels = {
    'american-diamond': 'American Diamond',
    'kundan': 'Kundan',
    'temple-jewelry': 'Temple Jewelry',
    'traditional-jewelry': 'Traditional Jewelry',
    'oxidized-jewelry': 'Oxidized Jewelry',
    'bridal-necklace-sets': 'Bridal Necklace Sets',
    'fusion-contemporary': 'Fusion / Contemporary',
    'premium-collection': 'Premium Collection',
    'american-diamond-earrings': 'American Diamond Earrings',
    'kundan-earrings': 'Kundan Earrings',
    'temple-earrings': 'Temple Earrings',
    'oxidized-earrings': 'Oxidized Earrings',
    'bangles': 'Bangles',
    'kadas': 'Kadas',
    'american-diamond-bangles': 'American Diamond Bangles',
    'kundan-bangles': 'Kundan Bangles',
    'temple-bangles': 'Temple Bangles',
    'oxidized-bangles': 'Oxidized Bangles',
    'american-diamond-rings': 'American Diamond Rings',
    'kundan-rings': 'Kundan Rings',
    'maang-tikka': 'Maang Tikka',
    'passa': 'Passa',
    'matha-patti': 'Matha Patti',
    'hathphool': 'Hathphool',
    'bajuband': 'Bajuband',
    'waist-belt-kamarband': 'Waist Belt / Kamarband',
    'banarasi-sarees': 'Banarasi Sarees',
    'kanchivaram-sarees': 'Kanchivaram Sarees',
    'bridal-sarees': 'Bridal Sarees',
    'designer-sarees': 'Designer Sarees',
    'party-wear-sarees': 'Party Wear Sarees',
    'party-wear-lehenga': 'Party Wear Lehenga',
    'indo-western': 'Indo Western',
    'anarkali': 'Anarkali',
    'party-wear-dresses': 'Party Wear Dresses'
  };
  const subcategoryHeadings = {
    'necklace-sets': 'Necklace Sets',
    'earrings': 'Earrings',
    'bangles-bracelets': 'Bangles & Bracelets',
    'rings': 'Rings',
    'bridal-accessories': 'Bridal Accessories',
    'sarees': 'Sarees',
    'lehengas': 'Lehengas',
    'dresses-gowns': 'Dresses/Gowns'
  };

  function buildNewArrivalsUrl(nextType, nextSubcategory) {
    const nextParams = new URLSearchParams();
    if (nextType) nextParams.set('type', nextType);
    if (nextType && nextSubcategory) nextParams.set('subcategory', nextSubcategory);
    const query = nextParams.toString();
    return query ? `${basePath}?${query}` : basePath;
  }

  function setLinkState(link, active) {
    link.classList.toggle('is-active', active);
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  document.querySelectorAll('[data-new-arrivals-filter]').forEach((filter) => {
    const categoryTriggers = filter.querySelectorAll('[data-filter-category-trigger]');
    const typeLinks = filter.querySelectorAll('[data-filter-type-link]');
    const subcategoryLinks = filter.querySelectorAll('[data-filter-subcategory-link]');
    const subcategoryGroups = filter.querySelectorAll('[data-subcategory-group]');
    const categoryAccordions = filter.querySelectorAll('[data-category-accordion]');
    const selectedTypeEl = filter.querySelector('[data-selected-type]');
    const selectedSubcategoryEl = filter.querySelector('[data-selected-subcategory]');
    const clearType = filter.querySelector('[data-clear-type]');
    const clearSubcategory = filter.querySelector('[data-clear-subcategory]');
    const clearAll = filter.querySelector('[data-clear-all]');

    categoryTriggers.forEach((button) => {
      const value = button.dataset.value;
      const active = value === selectedType;
      const panelId = button.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;

      button.classList.toggle('active', active);
      button.classList.toggle('is-active', active);
      if (active) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }

      button.setAttribute('aria-expanded', active ? 'true' : 'false');
      if (panel) panel.hidden = !active;

      if (!button.dataset.categoryTriggerBound) {
        button.dataset.categoryTriggerBound = 'true';
        button.addEventListener('click', (event) => {
          const nextType = button.dataset.value;
          if (nextType && nextType !== new URLSearchParams(window.location.search).get('type')) {
            event.preventDefault();
            window.location.href = buildNewArrivalsUrl(nextType, '');
          }
        });
      }
    });

    typeLinks.forEach((link) => {
      const value = link.dataset.value;
      const active = (!selectedType && !value) || value === selectedType;
      link.href = buildNewArrivalsUrl(value, '');
      link.setAttribute('aria-checked', active ? 'true' : 'false');
      setLinkState(link, active);
    });

    categoryAccordions.forEach((accordion) => {
      accordion.classList.toggle('active', accordion.dataset.type === selectedType);
    });

    subcategoryGroups.forEach((group) => {
      group.hidden = selectedType ? group.dataset.type !== selectedType : true;
    });

    subcategoryLinks.forEach((link) => {
      const value = link.dataset.value;
      const parentGroup = link.closest('[data-subcategory-group]');
      const parentType = parentGroup ? parentGroup.dataset.type : selectedType;
      const active = parentType === selectedType && ((!selectedSubcategory && !value) || value === selectedSubcategory);
      link.href = buildNewArrivalsUrl(parentType, value);
      link.setAttribute('aria-checked', active ? 'true' : 'false');
      setLinkState(link, active);
    });

    if (selectedTypeEl) selectedTypeEl.textContent = selectedType ? typeLabels[selectedType] || selectedType : 'Any';
    if (selectedSubcategoryEl) selectedSubcategoryEl.textContent = selectedSubcategory ? subcategoryLabels[selectedSubcategory] || selectedSubcategory : 'Any';
    if (clearType) clearType.href = basePath;
    if (clearSubcategory) clearSubcategory.href = buildNewArrivalsUrl(selectedType, '');
    if (clearAll) clearAll.href = basePath;

    syncDivaaFilterAccordions(filter);
    initCarbonFilterAccordions(filter);
  });

  const cards = document.querySelectorAll('[data-product-card]');
  if (cards.length) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardTypes = getDataList(card, 'productType');
      const cardSubcategories = getDataList(card, 'subcategory');
      const typeMatches = !selectedType || cardTypes.includes(selectedType);
      const subcategoryMatches = !selectedSubcategory || cardSubcategories.includes(selectedSubcategory);
      const isVisible = typeMatches && subcategoryMatches;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    updateCollectionVisibleCount(visibleCount);
    updateFilteredEmptyState(visibleCount, Boolean(selectedType || selectedSubcategory));
  }
}

function initDivaaBridalCategoryFilters() {
  const filterBlocks = document.querySelectorAll('[data-bridal-category-filter]');
  if (!filterBlocks.length) return;

  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  const selectedCategories = categoryParam && categoryParam !== 'all'
    ? categoryParam.split(',').map((value) => value.trim()).filter(Boolean)
    : [];
  const basePath = window.location.pathname.replace(/\/$/, '') || '/collections/bridal';

  function buildBridalCategoryUrl(categories) {
    const nextCategories = Array.from(new Set(categories.filter(Boolean)));
    if (!nextCategories.length) return basePath;
    return `${basePath}?category=${nextCategories.join(',')}`;
  }

  function setLinkState(link, active) {
    link.classList.toggle('is-active', active);
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  filterBlocks.forEach((filter) => {
    const allLink = filter.querySelector('[data-bridal-category-all]');
    const categoryLinks = filter.querySelectorAll('[data-bridal-category-link]');
    const allActive = selectedCategories.length === 0;

    if (allLink) {
      allLink.href = basePath;
      setLinkState(allLink, allActive);
    }

    categoryLinks.forEach((link) => {
      const value = link.dataset.value;
      const isSelected = selectedCategories.includes(value);
      const nextCategories = isSelected
        ? selectedCategories.filter((category) => category !== value)
        : selectedCategories.concat(value);

      link.href = buildBridalCategoryUrl(nextCategories);
      setLinkState(link, isSelected);
    });
  });

  const cards = document.querySelectorAll('[data-product-card]');
  if (cards.length) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCategories = getDataList(card, 'bridalCategory');
      const isVisible = cardCategories.length > 0
        && (selectedCategories.length === 0
          || selectedCategories.some((category) => cardCategories.includes(category)));

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    updateCollectionVisibleCount(visibleCount);
    updateFilteredEmptyState(visibleCount, true);
  }
}

function initDivaaJewelryCollectionFilters() {
  const shell = document.querySelector('[data-collection-handle]');
  if (!shell) return;

  const currentHandle = shell.dataset.collectionHandle;
  const handleMap = {
    'jewelry': { type: '' },
    'necklace-sets': { type: 'necklace-sets' },
    'american-diamond-necklace-sets': { type: 'necklace-sets', subcategory: 'american-diamond' },
    'kundan-necklace-sets': { type: 'necklace-sets', subcategory: 'kundan' },
    'temple-jewelry-necklace-sets': { type: 'necklace-sets', subcategory: 'temple-jewelry' },
    'traditional-necklace-sets': { type: 'necklace-sets', subcategory: 'traditional-jewelry' },
    'oxidized-necklace-sets': { type: 'necklace-sets', subcategory: 'oxidized-jewelry' },
    'bridal-necklace-sets': { type: 'necklace-sets', subcategory: 'bridal-necklace-sets' },
    'fusion-contemporary-necklace-sets': { type: 'necklace-sets', subcategory: 'fusion-contemporary' },
    'premium-necklace-sets': { type: 'necklace-sets', subcategory: 'premium-collection' },
    'earrings': { type: 'earrings' },
    'american-diamond-earrings': { type: 'earrings', subcategory: 'american-diamond-earrings' },
    'kundan-earrings': { type: 'earrings', subcategory: 'kundan-earrings' },
    'temple-earrings': { type: 'earrings', subcategory: 'temple-earrings' },
    'oxidized-earrings': { type: 'earrings', subcategory: 'oxidized-earrings' },
    'bangles-bracelets': { type: 'bangles-bracelets' },
    'bangles': { type: 'bangles-bracelets', subcategory: 'bangles' },
    'kadas': { type: 'bangles-bracelets', subcategory: 'kadas' },
    'american-diamond-bangles': { type: 'bangles-bracelets', subcategory: 'american-diamond-bangles' },
    'kundan-bangles': { type: 'bangles-bracelets', subcategory: 'kundan-bangles' },
    'temple-bangles': { type: 'bangles-bracelets', subcategory: 'temple-bangles' },
    'oxidized-bangles': { type: 'bangles-bracelets', subcategory: 'oxidized-bangles' },
    'rings': { type: 'rings' },
    'american-diamond-rings': { type: 'rings', subcategory: 'american-diamond-rings' },
    'kundan-rings': { type: 'rings', subcategory: 'kundan-rings' },
    'bridal-accessories': { type: 'bridal-accessories' },
    'maang-tikka': { type: 'bridal-accessories', subcategory: 'maang-tikka' },
    'passa': { type: 'bridal-accessories', subcategory: 'passa' },
    'matha-patti': { type: 'bridal-accessories', subcategory: 'matha-patti' },
    'hathphool': { type: 'bridal-accessories', subcategory: 'hathphool' },
    'bajuband': { type: 'bridal-accessories', subcategory: 'bajuband' },
    'waist-belt-kamarband': { type: 'bridal-accessories', subcategory: 'waist-belt-kamarband' }
  };
  const selected = handleMap[currentHandle];
  if (!selected) return;

  const cards = document.querySelectorAll('[data-product-card]');
  if (!cards.length) return;

  const jewelryTypes = ['necklace-sets', 'earrings', 'bangles-bracelets', 'rings', 'bridal-accessories'];
  let visibleCount = 0;
  cards.forEach((card) => {
    const cardTypes = getDataList(card, 'productType');
    const cardSubcategories = getDataList(card, 'subcategory');
    const typeMatches = selected.type
      ? cardTypes.includes(selected.type)
      : cardTypes.some((type) => jewelryTypes.includes(type));
    const subcategoryMatches = !selected.subcategory || cardSubcategories.includes(selected.subcategory);
    const isVisible = typeMatches && subcategoryMatches;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  updateCollectionVisibleCount(visibleCount);
  updateFilteredEmptyState(visibleCount, true);
}

function initDivaaClothingCollectionFilters() {
  const filterBlocks = document.querySelectorAll('[data-clothing-collection-filter]');
  if (!filterBlocks.length) return;

  const params = new URLSearchParams(window.location.search);
  const urlType = params.get('type');
  const urlSubcategory = params.get('subcategory');

  function buildClothingUrl(basePath, type, subcategory) {
    const nextParams = new URLSearchParams();
    if (type) nextParams.set('type', type);
    if (subcategory) nextParams.set('subcategory', subcategory);
    const query = nextParams.toString();
    return query ? `${basePath}?${query}` : basePath;
  }

  function setOptionState(option, active) {
    option.classList.toggle('active', active);
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-checked', active ? 'true' : 'false');
    if (active) {
      option.setAttribute('aria-current', 'true');
    } else {
      option.removeAttribute('aria-current');
    }
  }

  let selectedType = '';
  let selectedSubcategory = '';

  filterBlocks.forEach((filter) => {
    const basePath = filter.dataset.basePath || '/collections/clothing';
    selectedType = urlType || filter.dataset.selectedType || '';
    selectedSubcategory = urlSubcategory || filter.dataset.selectedSubcategory || '';

    const validSubcategoryGroup = selectedType
      ? filter.querySelector(`[data-clothing-child-group][data-type="${CSS.escape(selectedType)}"]`)
      : null;

    if (selectedSubcategory && !validSubcategoryGroup?.querySelector(`[data-clothing-subcategory-link][data-value="${CSS.escape(selectedSubcategory)}"]`)) {
      selectedSubcategory = '';
    }

    filter.querySelectorAll('[data-clothing-type-link]').forEach((option) => {
      const value = option.dataset.value || '';
      option.href = buildClothingUrl(basePath, value, '');
      setOptionState(option, value === selectedType);
    });

    filter.querySelectorAll('[data-clothing-child-group]').forEach((group) => {
      group.hidden = group.dataset.type !== selectedType;
    });

    filter.querySelectorAll('[data-clothing-subcategory-link]').forEach((option) => {
      const value = option.dataset.value || '';
      const parentGroup = option.closest('[data-clothing-child-group]');
      const parentType = parentGroup?.dataset.type || selectedType;
      option.href = buildClothingUrl(basePath, parentType, value);
      setOptionState(option, parentType === selectedType && value === selectedSubcategory);
    });

    syncDivaaFilterAccordions(filter);
  });

  const collectionShell = document.querySelector('[data-collection-handle]');
  const currentHandle = collectionShell?.dataset.collectionHandle || '';
  if (currentHandle !== 'clothing') return;

  const cards = document.querySelectorAll('[data-product-card]');
  if (!cards.length) return;

  const clothingTypes = ['sarees', 'lehengas', 'dresses-gowns'];
  let visibleCount = 0;
  cards.forEach((card) => {
    const cardTypes = getDataList(card, 'productType');
    const cardSubcategories = getDataList(card, 'subcategory');
    const typeMatches = selectedType
      ? cardTypes.includes(selectedType)
      : cardTypes.some((type) => clothingTypes.includes(type));
    const subcategoryMatches = !selectedSubcategory || cardSubcategories.includes(selectedSubcategory);
    const isVisible = typeMatches && subcategoryMatches;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  updateCollectionVisibleCount(visibleCount);
  updateFilteredEmptyState(visibleCount, true);
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-filter-type-link], [data-filter-subcategory-link], [data-clear-type], [data-clear-subcategory], [data-clear-all]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href) return;

  event.preventDefault();
  event.stopPropagation();
  window.location.href = href;
}, true);

document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 });
  }

  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 32);
    }, { passive: true });
  }

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    const backdrop = document.createElement('div');
    backdrop.id = 'nav-backdrop';
    document.body.appendChild(backdrop);

    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'sidebar-header';
    sidebarHeader.innerHTML = '<span class="sidebar-brand">DIVAA</span><button class="sidebar-close" aria-label="Close menu"><i class="fas fa-times"></i></button>';
    mobileNav.insertBefore(sidebarHeader, mobileNav.firstChild);

    function closeSidebar() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      backdrop.classList.remove('show');
      document.body.style.overflow = '';
    }

    function openSidebar() {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('open');
      backdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? closeSidebar() : openSidebar();
    });

    backdrop.addEventListener('click', closeSidebar);
    sidebarHeader.querySelector('.sidebar-close').addEventListener('click', closeSidebar);

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeSidebar);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileNav.classList.contains('open')) closeSidebar();
    });
  }

  document.querySelectorAll('.mobile-menu-group > summary').forEach((summary) => {
    summary.addEventListener('click', function () {
      const current = this.parentElement;
      document.querySelectorAll('.mobile-menu-group[open]').forEach((group) => {
        if (group !== current) group.removeAttribute('open');
      });
    });
  });

  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.querySelector('.cart-drawer-backdrop');

  function openCartDrawer() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartBackdrop.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.js-cart-toggle').forEach((link) => {
    link.addEventListener('click', function (event) {
      if (!cartDrawer) return;
      event.preventDefault();
      openCartDrawer();
    });
  });

  document.querySelectorAll('[data-cart-close]').forEach((button) => {
    button.addEventListener('click', closeCartDrawer);
  });

  const searchDrawer = document.getElementById('search-drawer');
  const searchBackdrop = document.querySelector('.search-drawer-backdrop');

  function openSearchDrawer() {
    if (!searchDrawer || !searchBackdrop) return;
    searchDrawer.classList.add('open');
    searchDrawer.setAttribute('aria-hidden', 'false');
    searchBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    const input = searchDrawer.querySelector('input[type="search"]');
    if (input) input.focus();
  }

  function closeSearchDrawer() {
    if (!searchDrawer || !searchBackdrop) return;
    searchDrawer.classList.remove('open');
    searchDrawer.setAttribute('aria-hidden', 'true');
    searchBackdrop.hidden = true;
    document.body.style.overflow = '';
  }

  const searchToggle = document.getElementById('search-toggle');
  if (searchToggle) {
    searchToggle.addEventListener('click', (event) => {
      if (!searchDrawer) return;
      event.preventDefault();
      openSearchDrawer();
    });
  }

  document.querySelectorAll('[data-search-close]').forEach((button) => {
    button.addEventListener('click', closeSearchDrawer);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCartDrawer();
      closeSearchDrawer();
    }
  });

  const filterPanel = document.getElementById('collection-filters');
  document.querySelectorAll('[data-filter-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      if (filterPanel) {
        filterPanel.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('[data-filter-close]').forEach((button) => {
    button.addEventListener('click', () => {
      if (filterPanel) {
        filterPanel.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('input[data-filter-url]').forEach((input) => {
    input.addEventListener('change', () => {
      const url = input.dataset.filterUrl;
      if (url) window.location.href = url;
    });
  });

  initDivaaNewArrivalsFilters();
  initDivaaBridalCategoryFilters();
  initDivaaJewelryCollectionFilters();
  initDivaaClothingCollectionFilters();
  syncDivaaFilterAccordions(document);
  initCarbonFilterAccordions(document);

  document.querySelectorAll('[data-qty-minus]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById('qty');
      if (input && parseInt(input.value, 10) > 1) input.value = parseInt(input.value, 10) - 1;
    });
  });

  document.querySelectorAll('[data-qty-plus]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById('qty');
      if (input) input.value = parseInt(input.value || '1', 10) + 1;
    });
  });

  document.querySelectorAll('[data-line-qty-minus]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.nextElementSibling;
      if (input && parseInt(input.value, 10) > 0) {
        input.value = parseInt(input.value, 10) - 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  document.querySelectorAll('[data-line-qty-plus]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      if (input) {
        input.value = parseInt(input.value || '0', 10) + 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  document.querySelectorAll('.product-thumbs button').forEach((button) => {
    button.addEventListener('click', () => {
      const image = document.getElementById('main-product-img');
      if (image && button.dataset.full) {
        image.src = button.dataset.full;
        document.querySelectorAll('.product-thumbs button').forEach((thumb) => thumb.classList.remove('active'));
        button.classList.add('active');
      }
    });
  });

  const wishlistButton = document.querySelector('.product-wishlist-btn');
  if (wishlistButton) {
    wishlistButton.addEventListener('click', function () {
      this.classList.toggle('active');
      const active = this.classList.contains('active');
      this.innerHTML = active
        ? '<i class="fas fa-heart" aria-hidden="true"></i> Saved'
        : '<i class="far fa-heart" aria-hidden="true"></i> Add to Wishlist';
    });
  }

  const mobileAtc = document.querySelector('[data-mobile-atc]');
  if (mobileAtc) {
    mobileAtc.addEventListener('click', () => {
      const addButton = document.querySelector('.product-form-v2 [name="add"]');
      if (addButton) addButton.click();
    });
  }

  const recentDataEl = document.getElementById('recent-product-data');
  const recentGrid = document.querySelector('[data-recently-viewed]');
  if (recentDataEl && recentGrid && window.localStorage) {
    try {
      const currentProduct = JSON.parse(recentDataEl.textContent);
      const storageKey = 'divaa_recently_viewed';
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]')
        .filter((item) => item && item.handle && item.handle !== currentProduct.handle);
      const nextItems = [currentProduct].concat(existing).slice(0, 5);
      localStorage.setItem(storageKey, JSON.stringify(nextItems));

      const visibleItems = nextItems.filter((item) => item.handle !== currentProduct.handle).slice(0, 4);
      if (visibleItems.length) {
        const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        })[char]);
        recentGrid.innerHTML = visibleItems.map((item) => {
          const image = item.image
            ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" width="400" height="533">`
            : '<div class="product-placeholder"><i class="fas fa-gem"></i><span>Divaa</span></div>';
          return `<a class="recently-card" href="${escapeHtml(item.url)}">${image}<strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.price)}</span></a>`;
        }).join('');
      }
    } catch (error) {
      recentGrid.hidden = true;
    }
  }

  function updateCartCount(count) {
    const cartCountEl = document.getElementById('cart-count');
    const floatBadge = document.getElementById('float-badge');
    if (cartCountEl) cartCountEl.textContent = count;
    if (floatBadge) floatBadge.textContent = count;
  }

  document.querySelectorAll('.quick-add').forEach((button) => {
    if (button.disabled || button.textContent.trim() === 'Sold Out') return;

    button.addEventListener('click', function () {
      const variantId = this.dataset.variantId;
      if (!variantId) return;

      const originalText = this.textContent;
      this.textContent = 'Adding...';
      this.disabled = true;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(variantId, 10), quantity: 1 })
      })
        .then((response) => {
          if (!response.ok) throw new Error('Cart add failed');
          return response.json();
        })
        .then(() => fetch('/cart.js'))
        .then((response) => response.json())
        .then((cart) => {
          updateCartCount(cart.item_count);
          this.textContent = 'Added';
          this.classList.add('is-added');
          openCartDrawer();
          setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('is-added');
            this.disabled = false;
          }, 1600);
        })
        .catch(() => {
          this.textContent = originalText;
          this.disabled = false;
        });
    });
  });

  const subBtn = document.getElementById('sub-btn');
  if (subBtn) {
    subBtn.addEventListener('click', function () {
      const input = document.querySelector('.newsletter-input');
      if (input && input.value && input.value.includes('@')) {
        this.textContent = 'Subscribed';
        this.classList.add('is-added');
        input.value = '';
        setTimeout(() => {
          this.textContent = 'Join VIP';
          this.classList.remove('is-added');
        }, 3000);
      } else if (input) {
        input.style.outline = '2px solid #B65C5C';
        setTimeout(() => {
          input.style.outline = '';
        }, 2000);
      }
    });
  }
});

document.addEventListener('shopify:section:load', initDivaaNewArrivalsFilters);
document.addEventListener('shopify:section:load', initDivaaBridalCategoryFilters);
document.addEventListener('shopify:section:load', initDivaaJewelryCollectionFilters);
document.addEventListener('shopify:section:load', initDivaaClothingCollectionFilters);
