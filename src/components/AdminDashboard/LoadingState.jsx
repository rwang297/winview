export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#E5E5E7] border-t-[#7b5aff] rounded-full animate-spin" />
        <div className="text-[#1D1D1F] font-medium">{message}</div>
      </div>
    </div>
  );
}
