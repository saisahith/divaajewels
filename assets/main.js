/* ============================================================
   DIVAA JEWELS — main.js (Shopify Edition)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── AOS (Animate on Scroll) ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ── Sticky header shadow ── */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Hamburger / Sidebar drawer ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    // Create backdrop dynamically
    const backdrop = document.createElement('div');
    backdrop.id = 'nav-backdrop';
    document.body.appendChild(backdrop);

    // Inject sidebar header with brand name + close button
    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'sidebar-header';
    sidebarHeader.innerHTML = '<span class="sidebar-brand">DiVaa</span><button class="sidebar-close" aria-label="Close menu"><i class="fas fa-times"></i></button>';
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

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeSidebar);
    });
  }

  /* ── Cart counter utilities ── */
  function updateCartCount(count) {
    const cartCountEl = document.getElementById('cart-count');
    const floatBadge  = document.getElementById('float-badge');
    if (cartCountEl) cartCountEl.textContent = count;
    if (floatBadge)  floatBadge.textContent  = count;
  }

  /* ── Quick Add to Cart (Shopify AJAX API) ── */
  document.querySelectorAll('.quick-add').forEach(btn => {
    if (btn.disabled || btn.textContent.trim() === 'Sold Out') return;

    btn.addEventListener('click', function () {
      const variantId = this.dataset.variantId;
      if (!variantId) return;

      const orig = this.textContent;
      this.textContent = 'Adding…';
      this.disabled = true;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(variantId), quantity: 1 })
      })
        .then(r => { if (!r.ok) throw new Error('Cart add failed'); return r.json(); })
        .then(() => fetch('/cart.js'))
        .then(r => r.json())
        .then(cart => {
          updateCartCount(cart.item_count);
          this.textContent = '✓ Added';
          this.style.background = '#2a7a2a';
          setTimeout(() => {
            this.textContent = orig;
            this.style.background = '';
            this.disabled = false;
          }, 1600);
        })
        .catch(() => {
          this.textContent = orig;
          this.disabled = false;
        });
    });
  });

  /* ── Hero parallax (desktop only) ── */
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const hero = document.querySelector('.hero-content');
      if (hero && y < window.innerHeight) {
        hero.style.transform = `translateY(${y * 0.28}px)`;
        hero.style.opacity   = 1 - y / (window.innerHeight * 0.7);
      }
    }, { passive: true });
  }

  /* ── Newsletter ── */
  const subBtn = document.getElementById('sub-btn');
  if (subBtn) {
    subBtn.addEventListener('click', function () {
      const inp = document.querySelector('.newsletter-input');
      if (inp && inp.value && inp.value.includes('@')) {
        this.textContent = '✓ Subscribed!';
        this.style.background = '#2a7a2a';
        inp.value = '';
        setTimeout(() => {
          this.textContent = 'Subscribe';
          this.style.background = '';
        }, 3000);
      } else if (inp) {
        inp.style.outline = '2px solid red';
        setTimeout(() => inp.style.outline = '', 2000);
      }
    });
  }

});
