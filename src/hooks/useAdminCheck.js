import { useQuery } from '@tanstack/react-query';

export function useAdminCheck(user) {
  const { data: me, isLoading: meLoading } = useQuery({
    queryKey: ['admin-me'],
    enabled: !!user,
    queryFn: async () => {
      const res = await fetch('/api/admin/allowlist?me=1');
      if (!res.ok) {
        if (res.status === 401) return { isAdmin: false };
        throw new Error(`Failed admin check: [${res.status}] ${res.statusText}`);
      }
      return res.json();
    },
  });

  const isAdmin = !!me?.isAdmin;

  return { isAdmin, meLoading };
}
