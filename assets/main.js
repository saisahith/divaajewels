/* DIVAA JEWELS - main.js (Shopify Edition) */

function initDivaaGuidedFilters() {
  const params = new URLSearchParams(window.location.search);
  const selectedType = params.get('type');

  document.querySelectorAll('[data-guided-filter]').forEach((filter) => {
    const initial = filter.querySelector('[data-guided-initial]');
    const selected = filter.querySelector('[data-guided-selected]');
    const selectedLabel = filter.querySelector('[data-guided-selected-label]');
    const options = filter.querySelector('[data-guided-options]');
    const links = filter.querySelectorAll('[data-guided-type-link]');
    const groups = filter.querySelectorAll('[data-guided-option-group]');

    links.forEach((link) => {
      const isActive = link.dataset.type === selectedType;
      link.classList.toggle('is-active', isActive);
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'true' : 'false');

      if (!link.dataset.guidedBound) {
        link.dataset.guidedBound = 'true';
        link.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.href = link.href;
        });
      }
    });

    groups.forEach((group) => {
      group.hidden = group.dataset.type !== selectedType;
    });

    if (selectedType) {
      const activeLink = filter.querySelector(`[data-guided-type-link][data-type="${CSS.escape(selectedType)}"]`);
      const label = activeLink ? activeLink.textContent.trim() : selectedType;

      if (selectedLabel) selectedLabel.textContent = label;
      if (initial) initial.hidden = true;
      if (selected) selected.hidden = false;
      if (options) options.hidden = false;
    } else {
      if (selectedLabel) selectedLabel.textContent = '';
      if (initial) initial.hidden = false;
      if (selected) selected.hidden = true;
      if (options) options.hidden = true;
    }
  });
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-guided-type-link]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href) return;

  event.preventDefault();
  event.stopPropagation();
  window.location.assign(href);
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

  initDivaaGuidedFilters();

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

document.addEventListener('shopify:section:load', initDivaaGuidedFilters);
