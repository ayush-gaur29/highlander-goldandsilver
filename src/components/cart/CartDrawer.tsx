import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Icons } from '../../utils/icons';
import { BUSINESS_INFO } from '../../data/businessInfo';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItemCount,
    subtotal,
    buyersPremium,
    totalSettlement,
    payPalCheckoutUrl
  } = useCart();

  // Close on Escape key press and prevent body scroll when open
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleNavigateToCollection = (categoryName?: string) => {
    setIsCartOpen(false);
    if (categoryName) {
      navigate(`/collection?category=${encodeURIComponent(categoryName)}`);
    } else {
      navigate('/collection');
    }
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        id="cartDrawerOverlay"
        onClick={handleClose}
        aria-hidden={!isCartOpen}
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        id="cartDrawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartDrawerHeading"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-wrap">
            <div className="cart-icon-circle">
              <Icons.ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="cart-drawer-title" id="cartDrawerHeading">
                Your Shopping Cart
              </h2>
              <span className="cart-item-count-label">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            id="cartDrawerCloseBtn"
            aria-label="Close cart drawer"
            onClick={handleClose}
          >
            <Icons.Close size={18} />
          </button>
        </div>

        {/* Storefront Advantage Sub-header Bar */}
        <div className="cart-perks-strip">
          <div className="cart-perk-item">
            <Icons.ShieldCheck size={13} className="perk-icon-gold" />
            <span>0% Montana Sales Tax</span>
          </div>
          <span className="cart-perk-sep">•</span>
          <div className="cart-perk-item">
            <Icons.Package size={13} className="perk-icon-gold" />
            <span>USPS Insured Shipping Included</span>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            /* Modern Luxury Empty State */
            <div className="cart-empty-state">
              <div className="cart-empty-icon-wrap">
                <div className="cart-empty-icon-glow" />
                <div className="cart-empty-icon">
                  <Icons.ShoppingBag size={36} />
                </div>
              </div>

              <h3 className="cart-empty-title">Your Cart is Empty</h3>
              <p className="cart-empty-text">
                Your investment bag is waiting for its next acquisition. Browse our authenticated Montana vault of sovereign gold, certified Morgan dollars, silver bullion, and ancient rarities.
              </p>

              <button
                type="button"
                className="btn btn-gold cart-empty-cta-btn"
                id="cartBrowseCollectionBtn"
                onClick={() => handleNavigateToCollection()}
              >
                <span>Explore Storefront Collection</span>
                <Icons.ArrowRight size={15} />
              </button>

              {/* Quick Category Discovery Pills */}
              <div className="cart-empty-discovery">
                <span className="cart-discovery-label">Quick Category Discovery</span>
                <div className="cart-discovery-grid">
                  <button
                    type="button"
                    className="cart-discovery-pill"
                    onClick={() => handleNavigateToCollection('Sovereign Gold Coins')}
                  >
                    <span className="pill-dot gold-dot" />
                    <span>Sovereign Gold</span>
                  </button>
                  <button
                    type="button"
                    className="cart-discovery-pill"
                    onClick={() => handleNavigateToCollection('Morgan Silver Dollars')}
                  >
                    <span className="pill-dot silver-dot" />
                    <span>Morgan Dollars</span>
                  </button>
                  <button
                    type="button"
                    className="cart-discovery-pill"
                    onClick={() => handleNavigateToCollection('Silver Bullion & Bars')}
                  >
                    <span className="pill-dot bullion-dot" />
                    <span>Silver Bullion</span>
                  </button>
                  <button
                    type="button"
                    className="cart-discovery-pill"
                    onClick={() => handleNavigateToCollection('Ancient Numismatics')}
                  >
                    <span className="pill-dot ancient-dot" />
                    <span>Ancient Rarities</span>
                  </button>
                </div>
              </div>

              {/* Trust Pillars in Empty State */}
              <div className="cart-empty-trust-list">
                <div className="cart-empty-trust-item">
                  <Icons.Check size={14} className="trust-icon" />
                  <div>
                    <strong>0% Montana Sales Tax</strong>
                    <p>Tax-exempt precious metals acquisition</p>
                  </div>
                </div>
                <div className="cart-empty-trust-item">
                  <Icons.Check size={14} className="trust-icon" />
                  <div>
                    <strong>In-House Insured Delivery</strong>
                    <p>Discreet packaging with full postal insurance</p>
                  </div>
                </div>
                <div className="cart-empty-trust-item">
                  <Icons.Check size={14} className="trust-icon" />
                  <div>
                    <strong>HGS Sold Value Guarantee</strong>
                    <p>Guaranteed authentic numismatics & bullion</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Populated State with Interactive Items List */
            <div className="cart-items-list">
              <div className="cart-items-actions-row">
                <span className="cart-review-label">
                  Selected Acquisitions ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                </span>
                <button
                  type="button"
                  className="cart-clear-btn"
                  onClick={clearCart}
                  title="Remove all items from cart"
                >
                  Clear All
                </button>
              </div>

              {cartItems.map(({ item, quantity }) => (
                <div key={item.id} className="cart-item-row" data-id={item.id}>
                  <div className="cart-item-media">
                    <img
                      src={item.featuredImage}
                      alt={item.title}
                      className="cart-item-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-meta">
                      <span className="cart-item-category">{item.category}</span>
                      <span className="cart-item-lot">Item #{item.lotNumber}</span>
                    </div>

                    <h4 className="cart-item-title" title={item.title}>
                      {item.title}
                    </h4>

                    <div className="cart-item-price-row">
                      <div className="cart-item-price-block">
                        <span className="cart-item-unit-price">{item.priceFormatted}</span>
                        {quantity > 1 && (
                          <span className="cart-item-subtotal-calc">
                            Total: ${(item.price * quantity).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper Control */}
                      <div className="cart-quantity-controls" aria-label="Adjust item quantity">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          aria-label={`Decrease quantity of ${item.title}`}
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                        >
                          <Icons.Minus size={11} />
                        </button>
                        <span className="cart-qty-number">{quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          aria-label={`Increase quantity of ${item.title}`}
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                        >
                          <Icons.Plus size={11} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        className="cart-remove-btn"
                        aria-label={`Remove ${item.title} from cart`}
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <Icons.Trash size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart-continue-browsing-row">
                <button
                  type="button"
                  className="cart-continue-link"
                  onClick={() => handleNavigateToCollection()}
                >
                  <Icons.ArrowRight size={13} style={{ transform: 'rotate(180deg)' }} />
                  <span>Add more pieces from Collection</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Settlement Breakdown and PayPal Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Settlement Breakdown Table */}
            <div className="cart-settlement-breakdown">
              <div className="breakdown-row">
                <span className="breakdown-label">Product Subtotal:</span>
                <span className="breakdown-value">
                  ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="breakdown-row">
                <span className="breakdown-label">
                  Settlement Fee (15% Buyer's Premium):
                </span>
                <span className="breakdown-value">
                  +${buyersPremium.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="breakdown-row">
                <span className="breakdown-label">Montana State Sales Tax:</span>
                <span className="breakdown-value breakdown-free">
                  $0.00 (0% Tax-Exempt)
                </span>
              </div>

              <div className="breakdown-row">
                <span className="breakdown-label">USPS Insured Shipping:</span>
                <span className="breakdown-value breakdown-free">
                  Included (In-House)
                </span>
              </div>

              <div className="breakdown-divider" />

              <div className="breakdown-row breakdown-total">
                <span className="total-label">Total Settlement:</span>
                <span className="total-amount">
                  ${totalSettlement.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Direct PayPal Checkout Button */}
            <a
              href={payPalCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-checkout"
              id="cartCheckoutBtn"
            >
              <Icons.CreditCard size={18} />
              Proceed to PayPal Checkout (${totalSettlement.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
            </a>

            {/* Continue Browsing Secondary Link */}
            <button
              type="button"
              className="btn btn-silver btn-sm cart-close-continue-btn"
              onClick={handleClose}
            >
              Continue Browsing Storefront
            </button>

            <div className="cart-footer-trust">
              <span className="badge-verified">
                <Icons.ShieldCheck size={13} />
                HGS Sold Value Guarantee Included
              </span>
              <p className="cart-wire-note">
                For transactions exceeding $5,000, bank wire payment is welcomed with an incoming wire fee credit.
                Inquire at <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a> or call {BUSINESS_INFO.phoneFormatted}.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

