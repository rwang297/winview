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

      <div className="max-w-[1200px] mx-auto relative z-10">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            const accent = card.accentBg;
            const chip = card.chipText;

            return (
              <div
                key={card.key}
                className="relative rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden group transition-all duration-300 ease-out hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] hover:scale-[1.02]"
              >
                {/* Accent glow */}
                <div
                  className={`absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br ${accent} blur-3xl rounded-full`}
                />

                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/80 border border-white/60 flex items-center justify-center shadow-sm">
                        <Icon className="text-[#1D1D1F]" size={22} />
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#1D1D1F]">{card.title}</h3>
                    </div>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-[#F5EFE6] text-[#7A6A55] border border-[#E8E2D9]">
                      {chip}
                    </span>
                  </div>

                  <p className="text-[14px] leading-relaxed text-[#6B7280] mb-6">
                    {card.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] text-[#9CA3AF]">Example target</p>
                      <p className="text-[15px] font-semibold text-[#1D1D1F]">
                        ₦50,000 – ₦2,000,000
                      </p>
                    </div>

                    <a
                      href="/open-account"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007AFF] text-white text-[13px] font-semibold shadow-lg shadow-[#007AFF]/20 hover:bg-[#0051D5] transition-all active:scale-95"
                    >
                      <span>Start Plan</span>
                      <ArrowRight size={16} />
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
