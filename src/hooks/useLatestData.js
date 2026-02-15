import { useQuery } from '@tanstack/react-query';

export function useLatestIppis(user, isAdmin) {
  return useQuery({
    queryKey: ['latest-ippis'],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      const res = await fetch('/api/ippis-applications?limit=5&sortBy=created_at&sortDir=desc');
      if (!res.ok) {
        throw new Error(`Failed to load latest IPPIS applications`);
      }
      return res.json();
    },
  });
}

export function useLatestAccounts(user, isAdmin) {
  return useQuery({
    queryKey: ['latest-accounts'],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      const res = await fetch('/api/accounts');
      if (!res.ok) {
        throw new Error(`Failed to load accounts`);
      }
      return res.json();
    },
  });
}

// ADD: latest complaints hook mirroring the pattern above
export function useLatestComplaints(user, isAdmin) {
  return useQuery({
    queryKey: ['latest-complaints'],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      const res = await fetch('/api/complaints');
      if (!res.ok) {
        throw new Error(`Failed to load complaints`);
      }
      return res.json();
    },
  });
}
