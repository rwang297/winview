import {
  Clock,
  CreditCard,
  Globe,
  Lock,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 px-6 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
            }}
          >
            Powerful features. <br />
            <span className="text-neutral-600 dark:text-neutral-400 font-normal">Designed for you.</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(200px,auto)]">
          {/* Large Card 1 - Security */}
          <div className="md:col-span-4 card-elevated p-10 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
            <div className="relative z-10 max-w-sm">
              <div className="w-14 h-14 bg-brand-100 dark:bg-brand-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield size={28} className="text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">Bank-grade Security</h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-lg">
                Your assets are protected by state-of-the-art encryption and biometric
                authentication.
              </p>
            </div>
            <div className="absolute top-1/2 -right-10 w-64 h-64 bg-gradient-to-br from-brand-400/10 to-accent-400/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <Lock className="absolute bottom-[-20px] right-[-20px] text-neutral-200 dark:text-neutral-800 w-64 h-64 rotate-[-15deg] mix-blend-overlay" />
          </div>

          {/* Small Card 2 - Speed */}
          <div className="md:col-span-2 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-500 text-white">
            <div className="relative z-10">
              <Zap size={32} className="mb-6 text-white" />
              <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-white/90">Instant transfers and real-time notifications.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Tall Card 3 - Mobile First */}
          <div className="md:col-span-2 md:row-span-2 bg-neutral-900 dark:bg-neutral-800 rounded-xl relative overflow-hidden group hover:shadow-lg transition-all duration-500 text-white flex flex-col justify-between h-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://raw.createusercontent.com/920a21cb-d251-4bf1-ab02-2d241fb3ae90/"
                alt="Mobile Lifestyle"
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
            </div>

            <div className="relative z-10 p-8">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center mb-6 border border-white/20">
                <Smartphone size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Mobile First</h3>
              <p className="text-white/90">
                Manage everything from your pocket. No branches needed.
              </p>
            </div>

            <div className="h-24 w-full" />
          </div>

          {/* Medium Card 4 - Global */}
          <div className="md:col-span-2 card-elevated p-8 group hover:shadow-lg transition-all duration-500">
            <Globe size={32} className="mb-6 text-brand-600 dark:text-brand-400" />
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Global Access</h3>
            <p className="text-neutral-700 dark:text-neutral-300">
              Use your card anywhere in the world with no hidden fees.
            </p>
          </div>

          {/* Medium Card 5 - Savings */}
          <div className="md:col-span-2 bg-gradient-to-br from-success-500 to-success-600 rounded-xl p-8 group hover:shadow-lg transition-all duration-500 text-white">
            <TrendingUp size={32} className="mb-6 text-white" />
            <h3 className="text-xl font-bold mb-2">High Yield</h3>
            <p className="text-white/90">Earn up to 4.5% APY on your savings account.</p>
          </div>

          {/* Wide Card 6 - Support */}
          <div className="md:col-span-4 card-elevated p-10 flex flex-col md:flex-row items-center gap-8 group hover:shadow-lg transition-all duration-500 relative overflow-hidden">
            {/* Background Image for Support */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
              <img
                src="https://raw.createusercontent.com/a6a59548-7c8d-4f21-9628-9afa78806ac8/"
                alt="Support Team"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 relative z-10">
              <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">24/7 Human Support</h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-lg mb-6">
                Real people, real answers. Connect with our dedicated support team anytime, day or
                night.
              </p>
              <a
                href="/complaints"
                className="inline-flex items-center gap-2 px-6 py-3 btn-secondary"
              >
                Get Help <Users size={18} />
              </a>
            </div>
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full border-4 border-white dark:border-neutral-700 bg-white dark:bg-neutral-600 shadow-lg overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt="support agent"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-16 h-16 rounded-full border-4 border-white dark:border-neutral-700 bg-brand-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
