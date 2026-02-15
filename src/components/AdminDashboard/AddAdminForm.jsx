import { UserPlus } from 'lucide-react';
import { useState } from 'react';

export function AddAdminForm({ onAdd, loading }) {
  const [email, setEmail] = useState('');
  const disabled = loading || !email.trim();
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onAdd(email.trim());
    setEmail('');
  };
  return (
    <form onSubmit={submit} className="flex gap-3">
      <div className="flex-1 rounded-xl border border-[#E5E5E7] px-4 py-3 bg-white">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Add admin by email (name@company.com)"
          className="w-full bg-transparent outline-none text-[#1D1D1F]"
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-white font-semibold shadow-lg disabled:opacity-60"
      >
        <UserPlus size={16} /> Add
      </button>
    </form>
  );
}
