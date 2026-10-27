import React from 'react';
import { InventoryItem } from '../../types';
import { Icons } from '../../utils/icons';
import { useCart } from '../../context/CartContext';

export interface ItemCardProps {
  item: InventoryItem;
  onClick: (item: InventoryItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const { addToCart } = useCart();
  const isUnavailable = item.status === 'Unavailable';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(item);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isUnavailable) {
      addToCart(item);
    }
  };

  return (
    <article
      className={`item-card ${isUnavailable ? 'item-card-unavailable' : ''}`}
      data-id={item.id}
      tabIndex={0}
      aria-label={`Item ${item.lotNumber}: ${item.title}`}
      onClick={() => onClick(item)}
      onKeyDown={handleKeyDown}
    >
      {/* Media Box with Item Badge & Subtle Warm Neutral / Silver Background */}
      <div className="card-media-box">
        <div className="lot-number-badge">
          <span className="lot-badge-text">Item #{item.lotNumber}</span>
        </div>

        <div className="category-tag-badge">{item.category}</div>

        {isUnavailable && (
          <div className="unavailable-watermark-badge">
            Currently Unavailable
          </div>
        )}

        <img
          src={item.featuredImage}
          alt={item.title}
          className="card-img"
          loading="lazy"
        />
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Technical specifications pills */}
        <div className="card-spec-tags">
          {item.grade && (
            <span className="spec-pill spec-pill-gold">
              <Icons.ShieldCheck size={11} />
              {item.grade}
            </span>
          )}
          {item.purity && (
            <span className="spec-pill spec-pill-silver">{item.purity}</span>
          )}
        </div>

        <h3 className="card-title" title={item.title}>
          {item.title}
        </h3>

        {/* Item Description */}
        <p className="card-description-preview">
          {item.lead || item.description}
        </p>

        {/* Footer: Price & Storefront Actions */}
        <div className="card-footer">
          <div className="card-price-box">
            <span className="price-label">Storefront Price</span>
            <span className="price-amount">{item.priceFormatted}</span>
            {isUnavailable && (
              <span className="status-note-label">Out of Stock</span>
            )}
          </div>

          <div className="card-actions-group">
            {!isUnavailable ? (
              <button
                type="button"
                className="btn-card-add-cart"
                aria-label={`Add ${item.title} to cart`}
                onClick={handleAddToCart}
                title="Add to shopping cart"
              >
                <Icons.ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-card-unavailable"
                disabled
                aria-label={`${item.title} is currently unavailable`}
              >
                <span>Unavailable</span>
              </button>
            )}

            <button
              type="button"
              className="card-inspect-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClick(item);
              }}
              aria-label={`Quick view of ${item.title}`}
              title="Inspect coin details"
            >
              <span>Inspect</span>
              <Icons.ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
