import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../data/businessInfo';
import { Icons } from '../utils/icons';
import { StorefrontNarrativeSection } from '../components/common/StorefrontNarrativeSection';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setFormError('Please enter your inquiry message.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    // Simulate clean dispatch with state confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      topic: 'General Inquiry',
      message: ''
    });
    setFormSubmitted(false);
  };

  return (
    <main className="contact-page-main">
      {/* Page Header Banner with Right-Side Contact Cover Image */}
      <section className="page-header-banner">
        <div className="container">
          <div className="page-banner-grid">
            <div className="page-banner-content">
              <nav className="page-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">Contact</span>
              </nav>


              <h1 className="page-banner-title">Contact Jewel Basin Armory</h1>
              <p className="page-banner-desc">
                Whether you are inquiring about a specific inventory piece, coordinating high-value bank wire settlement, or scheduling a private consultation in Flathead County, we provide direct, confidential assistance.
              </p>

              {/* Quick Contact Pills */}
              <div className="collection-stats-strip">
                <div className="stat-pill">
                  <Icons.Phone size={14} />
                  <span>(406) 837-1426 (Mon–Sat)</span>
                </div>
                <div className="stat-pill">
                  <Icons.MapPin size={14} />
                  <span>Bigfork, Montana 59911</span>
                </div>
                <div className="stat-pill">
                  <Icons.CreditCard size={14} />
                  <span>Direct PayPal / Wire Portal</span>
                </div>
              </div>
            </div>

            {/* Right-Side Relevant Image Showcase */}
            <div className="page-banner-media">
              <div className="page-banner-media-box">
                <img
                  src="/assets/brand/contact_cover_precious_metals.jpg"
                  alt="Highlander Storefront and Precious Metals Consultation"
                  className="page-banner-img"
                  width={1376}
                  height={768}
                  loading="eager"
                />
              </div>
              <div className="page-banner-badge">
                <div className="banner-badge-icon">
                  <Icons.MapPin size={16} />
                </div>
                <span className="banner-badge-text">Flathead County Private Viewing &amp; Settlement</span>
                <span className="banner-badge-sub">48.06° N</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Hub: Interactive Form & Direct Storefront Channels */}


      {/* About & Storefront Information Section — Refined 2-Column Layout */}
      <StorefrontNarrativeSection />
    </main>
  );
};

export default ContactPage;
