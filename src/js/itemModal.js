/**
 * Highlander Gold & Silver — Item Detail Inspection Modal
 * Shows verified specifications, multi-image view, PayPal checkout action, and direct inquiry.
 */

import { icons } from './icons.js';
import { generatePayPalPaymentLink, generateEmailInquiryLink, BUSINESS_INFO } from '../data/inventory.js';

let activeItem = null;
let currentImageIndex = 0;

export function initItemModal() {
  const modalOverlay = document.getElementById('itemModalOverlay');
  if (!modalOverlay) return;

  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

export function openItemModal(item) {
  activeItem = item;
  currentImageIndex = 0;

  const modalOverlay = document.getElementById('itemModalOverlay');
  const modalContent = document.getElementById('modalDynamicContent');
  if (!modalOverlay || !modalContent) return;

  renderModalContent(modalContent, item);
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const modalOverlay = document.getElementById('itemModalOverlay');
  if (!modalOverlay) return;

  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderModalContent(container, item) {
  const images = item.additionalImages && item.additionalImages.length > 0
    ? item.additionalImages
    : [item.featuredImage];

  const payPalUrl = generatePayPalPaymentLink(item.price);
  const emailInquiryUrl = generateEmailInquiryLink(item);

  // 15% buyer premium calculation for transparency
  const buyersPremiumAmount = (item.price * 0.15).toFixed(2);
  const totalSettlement = (item.price * 1.15).toFixed(2);

  container.innerHTML = `
    <div class="modal-grid">
      <!-- Media Gallery Column -->
      <div class="modal-gallery-side">
        <div class="modal-main-img-box">
          <img 
            id="modalMainImage"
            src="${images[0]}" 
            alt="${escapeHtml(item.title)}" 
            class="modal-main-img"
          />
        </div>

        ${images.length > 1 ? `
          <div class="modal-thumb-row">
            ${images.map((img, idx) => `
              <button 
                type="button" 
                class="modal-thumb ${idx === 0 ? 'active' : ''}" 
                data-idx="${idx}"
                aria-label="View photo ${idx + 1}"
              >
                <img src="${img}" alt="Thumbnail ${idx + 1}" />
              </button>
            `).join('')}
          </div>
        ` : ''}

        <div style="margin-top: 1.5rem; text-align: center; width: 100%;">
          <span class="badge-verified">
            ${icons.shieldCheck(14)}
            Certified & Inspected by HGS
          </span>
          <p style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-tertiary); margin-top: 0.4rem;">
            Bigfork, Montana Armory Inventory
          </p>
        </div>
      </div>

      <!-- Information Column -->
      <div class="modal-info-side">
        <div class="modal-lot-tag">
          Item # ${item.lotNumber} · ${item.category}
        </div>

        <h2 class="modal-title">${escapeHtml(item.title)}</h2>

        <!-- Price Card -->
        <div class="modal-price-card">
          <div>
            <div class="price-label">Listed Price / Cost</div>
            <div class="price-amount">${item.priceFormatted}</div>
            ${item.estimateRange ? `<div class="modal-estimate">Estimate: ${item.estimateRange}</div>` : ''}
          </div>
          <div style="text-align: right;">
            <div class="price-label">Settlement with 15% BP</div>
            <div style="font-family: var(--font-mono); font-weight: 700; color: var(--color-gold-dark); font-size: 1.1rem;">
              $${totalSettlement}
            </div>
            <div style="font-size: 0.68rem; color: var(--text-tertiary);">Montana 0% Sales Tax</div>
          </div>
        </div>

        <!-- Verified Specifications Table -->
        <table class="modal-specs-table">
          <tbody>
            <tr>
              <th>Item / Lot #</th>
              <td>Lot #${item.lotNumber}</td>
            </tr>
            <tr>
              <th>Classification</th>
              <td>${item.category} (${item.metal})</td>
            </tr>
            ${item.purity ? `
              <tr>
                <th>Purity / Metal</th>
                <td>${item.purity}</td>
              </tr>
            ` : ''}
            ${item.grade ? `
              <tr>
                <th>Certified Grade</th>
                <td>${item.grade}</td>
              </tr>
            ` : ''}
            ${item.mintage ? `
              <tr>
                <th>Mintage / Issue</th>
                <td>${item.mintage}</td>
              </tr>
            ` : ''}
          </tbody>
        </table>

        <!-- Description -->
        <div class="modal-description">
          <p>${escapeHtml(item.description)}</p>
          ${item.paymentNote ? `
            <div style="margin-top: 0.85rem; padding: 0.65rem 0.85rem; background: rgba(58, 15, 52, 0.05); border-left: 3px solid var(--color-gold); font-size: 0.82rem; color: var(--color-aubergine);">
              <strong>Payment Terms:</strong> ${escapeHtml(item.paymentNote)}
            </div>
          ` : ''}
        </div>

        <!-- Numismatic Sold Value Promise Callout -->
        <div style="background: #FAF9F6; border: 1px solid var(--color-silver-border); border-radius: var(--radius-xs); padding: 0.85rem 1rem; margin-bottom: 1.5rem; font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5;">
          <strong style="color: var(--color-aubergine); display: block; margin-bottom: 0.2rem;">
            HGS Sold Value Guarantee:
          </strong>
          If proof is presented that any won coin was overpriced based on current market state, HGS refunds the difference or accepts as-sold return.
        </div>

        <!-- Action CTAs -->
        <div class="modal-actions">
          <a 
            href="${payPalUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-gold"
            style="flex: 1.2;"
          >
            ${icons.creditCard(16)}
            Instant Close via PayPal ($${cleanAmount(item.price)})
          </a>

          <a 
            href="${emailInquiryUrl}" 
            class="btn btn-outline"
            style="flex: 1;"
          >
            ${icons.mail(16)}
            Inquire / Offer
          </a>
        </div>

        <p style="font-size: 0.68rem; color: var(--text-tertiary); text-align: center; margin-top: 0.75rem;">
          PayPal Link: <a href="${BUSINESS_INFO.payPalUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--color-aubergine); text-decoration: underline;">paypal.me/HighlanderGoldSilver</a> · Phone: <a href="tel:${BUSINESS_INFO.phone}" style="color: var(--color-aubergine);">${BUSINESS_INFO.phoneFormatted}</a>
        </p>
      </div>
    </div>
  `;

  // Attach thumbnail click handlers
  const thumbs = container.querySelectorAll('.modal-thumb');
  const mainImg = container.querySelector('#modalMainImage');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = Number(thumb.dataset.idx);
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg && images[idx]) {
        mainImg.src = images[idx];
      }
    });
  });
}

function cleanAmount(val) {
  return Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
