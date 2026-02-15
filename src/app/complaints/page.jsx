'use client';

import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import { Check, Phone } from 'lucide-react';
import { useState } from 'react';

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Custom gradient
  const winviewGradient = 'from-[#7b5aff] to-[#5ecbf7]';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-50">
        <img
          src="https://raw.createusercontent.com/e4c7154d-a7bb-4f7a-9126-0a9ba6fa1e50/"
          alt="Background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#7b5aff]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <Header />
      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-[48px] md:text-[64px] font-semibold text-[#1D1D1F] mb-6 tracking-tight leading-none">
              Customer <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${winviewGradient}`}>
                Support
              </span>
            </h1>
            <p className="text-[21px] text-[#86868b] max-w-2xl mx-auto">
              We're here to help. Submit your complaint or contact us directly.
            </p>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div
              className={`mb-8 p-6 bg-gradient-to-r ${winviewGradient} rounded-[24px] flex items-center gap-6 shadow-lg text-white`}
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={24} className="text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-[19px] font-bold mb-1">Complaint Submitted</h3>
                <p className="text-white/90 text-[15px]">
                  Thank you for contacting us. We've received your complaint and will respond within
                  24 hours.
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Call Us Card */}
            <a
              href="tel:+1234567890"
              className={`p-10 bg-gradient-to-br ${winviewGradient} rounded-[32px] text-white hover:scale-[1.02] transition-all shadow-xl shadow-[#7b5aff]/20 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-colors" />

              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Phone size={32} className="text-white" />
              </div>
              <h3 className="text-[24px] font-semibold mb-2 tracking-tight">Call Us Now</h3>
              <p className="text-[17px] text-white/80 mb-6">Speak with our support team directly</p>
              <div className="text-[24px] font-bold tracking-tight">+1 (234) 567-890</div>
            </a>

            {/* Operating Hours Card */}
            <div className="p-10 bg-white/95 backdrop-blur-sm rounded-[32px] border border-white/60 shadow-sm flex flex-col justify-center">
              <h3 className="text-[24px] font-semibold text-[#1D1D1F] mb-8 tracking-tight">
                Operating Hours
              </h3>
              <div className="space-y-6 text-[17px]">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-[#86868b]">Monday - Friday</span>
                  <span className="font-semibold text-[#1D1D1F]">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-[#86868b]">Saturday</span>
                  <span className="font-semibold text-[#1D1D1F]">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#86868b]">Sunday</span>
                  <span className="font-semibold text-[#1D1D1F] text-red-500 bg-red-50 px-3 py-1 rounded-full text-sm">
                    Closed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Complaint Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-[40px] p-8 md:p-12 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60">
            <h2 className="text-[32px] font-semibold text-[#1D1D1F] mb-10 tracking-tight text-center">
              Submit a Complaint
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[15px] font-medium text-[#1D1D1F] mb-2 pl-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl text-[17px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-[15px] font-medium text-[#1D1D1F] mb-2 pl-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl text-[17px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[15px] font-medium text-[#1D1D1F] mb-2 pl-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl text-[17px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label className="block text-[15px] font-medium text-[#1D1D1F] mb-2 pl-2">
                    Issue Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl text-[17px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all"
                  >
                    <option value="">Select Category</option>
                    <option value="account">Account Issues</option>
                    <option value="transaction">Transaction Problems</option>
                    <option value="technical">Technical Support</option>
                    <option value="service">Service Quality</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-medium text-[#1D1D1F] mb-2 pl-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-5 py-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl text-[17px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all resize-none"
                  placeholder="Please describe your issue in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-5 bg-gradient-to-r ${winviewGradient} text-white rounded-full text-[19px] font-medium hover:shadow-lg hover:scale-[1.02] transition-all shadow-[#7b5aff]/25 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
