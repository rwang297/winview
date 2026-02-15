import { AddAdminForm } from './AddAdminForm';

export function AdminAccessManager({ admins, allowlistLoading, addAdmin, removeAdmin }) {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-semibold text-[#1D1D1F] tracking-tight flex items-center gap-3">
          <span>Admin Access</span>
        </h2>
      </div>

      <AddAdminForm onAdd={(email) => addAdmin.mutate(email)} loading={addAdmin.isPending} />

      <div className="mt-6">
        <h3 className="text-[14px] font-semibold text-[#1D1D1F] uppercase tracking-widest mb-3">
          Current Admins
        </h3>
        {allowlistLoading ? (
          <div className="text-[#1D1D1F]">Loading list…</div>
        ) : admins.length === 0 ? (
          <div className="text-[#1D1D1F]">No admins added yet.</div>
        ) : (
          <div className="space-y-3">
            {admins.map((a, idx) => (
              <div
                key={`${a.email}-${idx}`}
                className="flex items-center justify-between p-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl"
              >
                <div>
                  <div className="text-[15px] font-semibold text-[#1D1D1F]">{a.email}</div>
                  <div className="text-[12px] text-[#1D1D1F]">
                    Added {new Date(a.created_at).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => removeAdmin.mutate(a.email)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7]"
                  title="Remove admin"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {(addAdmin.isError || removeAdmin.isError) && (
          <div className="mt-3 text-[13px] text-[#FF3B30]">
            {(addAdmin.error && addAdmin.error.message) ||
              (removeAdmin.error && removeAdmin.error.message) ||
              'Something went wrong'}
          </div>
        )}
      </div>
    </div>
  );
}
