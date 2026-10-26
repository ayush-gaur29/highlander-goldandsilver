/**
 * Highlander Gold & Silver — Main Application Entry Point
 */

import { INVENTORY_ITEMS, BUSINESS_INFO } from '../data/inventory.js';
import { initNavbar } from './navbar.js';
import { initCollection } from './collection.js';
import { initItemModal } from './itemModal.js';
import { icons } from './icons.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Header Navigation
  initNavbar();

  // Initialize Item Detail Modal
  initItemModal();

  // Initialize Collection Grid & Browsing
  initCollection(INVENTORY_ITEMS);

  // Setup Scroll Reveal Observer
  setupScrollReveal();

  // Setup Payment Calculator Tool in Payment Section
  setupPaymentCalculator();

  // Setup VIP Collector Email Registry
  setupEmailRegistry();

  // Initialize Hero Entrance Animations & Typewriter
  initHeroTypewriter();
  setupHeroAnimationCleanup();
});

function setupEmailRegistry() {
  const form = document.getElementById('emailRegistryForm');
  const input = document.getElementById('registryEmailInput');
  const successMsg = document.getElementById('registrySuccessMsg');
  const emailEcho = document.getElementById('registeredEmailEcho');
  const submitBtn = document.getElementById('registrySubmitBtn');

  if (!form || !input) return;

  // Restore any previous registration
  const savedEmail = localStorage.getItem('hgs_registered_email');
  if (savedEmail && emailEcho && successMsg) {
    emailEcho.textContent = savedEmail;
    successMsg.style.display = 'flex';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) return;

    // Collect checked interests
    const selectedInterests = Array.from(
      document.querySelectorAll('#interestPillsGroup input:checked')
    ).map(cb => cb.value);

    // Save registration
    localStorage.setItem('hgs_registered_email', email);
    localStorage.setItem('hgs_interests', JSON.stringify(selectedInterests));

    if (emailEcho) emailEcho.textContent = email;
    if (successMsg) successMsg.style.display = 'flex';

    if (submitBtn) {
      submitBtn.innerHTML = `✓ Registered`;
      submitBtn.style.background = '#28a745';
      submitBtn.style.color = '#FFFFFF';
      submitBtn.disabled = true;
    }
  });
}

function setupScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

function setupPaymentCalculator() {
  const amountInput = document.getElementById('calcAmountInput');
  const payBtn = document.getElementById('calcPayBtn');
  const bpAmountDisplay = document.getElementById('calcBpAmount');
  const totalAmountDisplay = document.getElementById('calcTotalAmount');

  if (!amountInput || !payBtn) return;

  function updateCalc() {
    const val = parseFloat(amountInput.value) || 0;
    const bp = val * 0.15;
    const total = val + bp;

    if (bpAmountDisplay) bpAmountDisplay.textContent = `$${bp.toFixed(2)}`;
    if (totalAmountDisplay) totalAmountDisplay.textContent = `$${total.toFixed(2)}`;

    const payPalUrl = val > 0 
      ? `${BUSINESS_INFO.payPalUrl}/${total.toFixed(2)}`
      : BUSINESS_INFO.payPalUrl;

    payBtn.href = payPalUrl;
  }

  amountInput.addEventListener('input', updateCalc);
  updateCalc();
}

/**
 * Hero Heading Typewriter Effect
 * Curated character-by-character reveal with zero layout shift
 */
function initHeroTypewriter() {
  const heading = document.getElementById('heroTitle');
  if (!heading) return;

  // Accessibility: ensure assistive tech immediately reads the full heading
  heading.setAttribute('aria-label', 'Curated Precious Metals & Sovereign Rarities');

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  // Segments to reconstruct heading faithfully with brand gradient
  const segments = [
    { text: 'Curated ', className: null },
    { text: 'Precious Metals', className: 'text-gradient-brand' },
    { text: ' & Sovereign Rarities', className: null }
  ];

  // Pre-generate spans with visibility: hidden to preserve exact layout geometry
  heading.innerHTML = '';
  const charSpans = [];

  segments.forEach(seg => {
    let container = heading;
    if (seg.className) {
      const span = document.createElement('span');
      span.className = seg.className;
      heading.appendChild(span);
      container = span;
    }

    for (let i = 0; i < seg.text.length; i++) {
      const char = seg.text[i];
      const charSpan = document.createElement('span');
      charSpan.className = 'typewriter-char';
      charSpan.style.visibility = 'hidden';
      charSpan.textContent = char;
      container.appendChild(charSpan);
      charSpans.push(charSpan);
    }
  });

  // Zero-layout-width blinking gold cursor
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  heading.appendChild(cursor);

  // Sequence: begin typewriter at t = 220ms
  const startDelay = 220;
  const charInterval = 38; // ~38ms per character
  let currentIndex = 0;

  setTimeout(() => {
    const timer = setInterval(() => {
      if (currentIndex < charSpans.length) {
        const span = charSpans[currentIndex];
        span.style.visibility = 'visible';

        // Move cursor right after the newly revealed character
        if (span.parentNode) {
          span.parentNode.insertBefore(cursor, span.nextSibling);
        }

        currentIndex++;
      } else {
        clearInterval(timer);

        // Allow cursor to blink for 500ms post-completion, then fade out and remove
        setTimeout(() => {
          cursor.classList.add('is-hidden');
          setTimeout(() => {
            cursor.remove();
          }, 400);
        }, 500);
      }
    }, charInterval);
  }, startDelay);
}

/**
 * Setup Hero Animation Cleanup
 * Cleans up forwards fill-mode on completion so native hover transforms work freely
 */
function setupHeroAnimationCleanup() {
  const elements = [
    document.getElementById('heroBrowseBtn'),
    document.getElementById('heroStoreModelBtn'),
    document.querySelector('.hero-slide-in-right')
  ];

  elements.forEach(el => {
    if (!el) return;
    el.addEventListener('animationend', () => {
      el.classList.add('animation-complete');
    }, { once: true });
  });
}
