// import { useSession } from '@auth/create/react';
import React from 'react';

// MOCK: temporary replacement for useSession
const useSession = () => {
  const [status, setStatus] = React.useState('authenticated'); // 'loading', 'authenticated', 'unauthenticated'
  const [data, setData] = React.useState({
    user: { id: '123', name: 'John Doe', email: 'john@example.com' },
  });

  return { data, status };
};

export const useUser = () => {
  const { data: session, status } = useSession();
  const id = session?.user?.id;

  const [user, setUser] = React.useState(session?.user ?? null);

  const fetchUser = React.useCallback(async (session) => {
    return session?.user;
  }, []);

  const refetchUser = React.useCallback(() => {
    if (id) {
      fetchUser(session).then(setUser);
    } else {
      setUser(null);
    }
  }, [fetchUser, id]);

  React.useEffect(refetchUser, [refetchUser]);

  return {
    user,
    data: user,
    loading: status === 'loading' || (status === 'authenticated' && !user),
    refetch: refetchUser,
  };
};

export default useUser;
