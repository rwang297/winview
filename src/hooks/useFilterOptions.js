import { useMemo } from 'react';

export function useFilterOptions(applications) {
  const ranks = useMemo(() => {
    return Array.from(new Set(applications.map((a) => a.rank).filter(Boolean))).sort();
  }, [applications]);

  const payPoints = useMemo(() => {
    return Array.from(new Set(applications.map((a) => a.pay_point).filter(Boolean))).sort();
  }, [applications]);

  const states = useMemo(() => {
    return Array.from(new Set(applications.map((a) => a.state).filter(Boolean))).sort();
  }, [applications]);

  return { ranks, payPoints, states };
}
