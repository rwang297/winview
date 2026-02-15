import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useAdminAllowlist(user, isAdmin) {
  const queryClient = useQueryClient();

  const {
    data: allowlistData,
    isLoading: allowlistLoading,
    refetch: refetchAllowlist,
  } = useQuery({
    queryKey: ['admin-allowlist'],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      const res = await fetch('/api/admin/allowlist');
      if (!res.ok) {
        throw new Error(`Failed to load allowlist: [${res.status}] ${res.statusText}`);
      }
      return res.json();
    },
  });

  const addAdmin = useMutation({
    mutationFn: async (email) => {
      const res = await fetch('/api/admin/allowlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Failed to add admin`);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-allowlist'] });
    },
  });

  const removeAdmin = useMutation({
    mutationFn: async (email) => {
      const res = await fetch(`/api/admin/allowlist?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Failed to remove admin`);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-allowlist'] });
    },
  });

  return {
    allowlistData,
    allowlistLoading,
    refetchAllowlist,
    addAdmin,
    removeAdmin,
  };
}
