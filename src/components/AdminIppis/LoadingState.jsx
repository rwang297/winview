export function LoadingState() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#E5E5E7] border-t-[#8A2BE2] rounded-full animate-spin" />
        <div className="text-[#86868b]">Checking access…</div>
      </div>
    </div>
  );
}
