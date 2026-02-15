import { ArrowRight, Briefcase, GraduationCap, Plane, Wallet } from 'lucide-react';

export default function SavingsPackagesSection() {
  const cards = [
    {
      key: 'school',
      title: 'School Fees',
      description: "Save towards your child's term fees with auto‑savings and reminders.",
      icon: GraduationCap,
      accentBg: 'from-[#007AFF]/15 to-[#5AC8FA]/15',
      chipText: 'For parents',
    },
    {
      key: 'business',
      title: 'Business Funding',
      description: 'Grow a pot for inventory, equipment, or expansion—on your terms.',
      icon: Briefcase,
      accentBg: 'from-purple-500/15 to-indigo-400/15',
      chipText: 'For SMEs',
    },
    {
      key: 'travel',
      title: 'Travel',
      description: 'Plan flights and stays ahead of time with flexible targets.',
      icon: Plane,
      accentBg: 'from-orange-400/15 to-rose-400/15',
      chipText: 'For trips',
    },
    {
      key: 'expenses',
      title: 'Expenses',
      description: 'Set aside money for bills and monthly needs—stress‑free.',
      icon: Wallet,
      accentBg: 'from-emerald-400/15 to-teal-400/15',
      chipText: 'For monthly',
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#FFFBF5] relative overflow-hidden">
      {/* Ambient shapes for warmth */}
      <div className="absolute -top-16 -left-10 w-[520px] h-[520px] bg-gradient-to-br from-[#FFB86C]/10 to-[#FFD1A6]/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-10 w-[560px] h-[560px] bg-gradient-to-tr from-[#8A2BE2]/10 to-[#5AC8FA]/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="w-full px-6 mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-[40px] md:text-[56px] font-semibold text-[#1D1D1F] tracking-tight mb-3"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
            }}
          >
            Smart Savings Packages
          </h2>
          <p className="text-[17px] text-[#6B7280] max-w-[720px] mx-auto">
            Pick a tailored plan and start building towards what matters—at your own pace.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            const accent = card.accentBg;
            const chip = card.chipText;

            return (
              <div
                key={card.key}
                className="relative rounded-[32px] bg-white backdrop-blur-xl border border-[#E5E7EB] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] overflow-hidden group transition-all duration-300 ease-out hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.12)] hover:border-[#D1D5DB]"
              >
                {/* Accent glow */}
                <div
                  className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${accent} blur-3xl rounded-full opacity-40`}
                />

                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] border border-[#D1D5DB] flex items-center justify-center shadow-sm">
                        <Icon className="text-[#1D1D1F]" size={26} />
                      </div>
                      <h3 className="text-[22px] font-bold text-[#1D1D1F]">{card.title}</h3>
                    </div>
                    <span className="text-[12px] px-3 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] font-semibold">
                      {chip}
                    </span>
                  </div>

                  <p className="text-[15px] leading-relaxed text-[#6B7280] mb-8 font-medium">
                    {card.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#F3F4F6]">
                    <div>
                      <p className="text-[12px] text-[#9CA3AF] font-semibold uppercase tracking-wider">Target Range</p>
                      <p className="text-[18px] font-bold text-[#1D1D1F] mt-2">
                        ₦50,000 – ₦2M
                      </p>
                    </div>

                    <a
                      href="/open-account"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#007AFF] text-white text-[14px] font-bold shadow-lg shadow-[#007AFF]/25 hover:bg-[#0051D5] hover:shadow-lg hover:shadow-[#0051D5]/30 transition-all active:scale-95"
                    >
                      <span>Start</span>
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
