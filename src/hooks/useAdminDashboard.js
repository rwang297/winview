import { useEffect, useState } from 'react';

export function useAdminDashboard(user, isAdmin) {
  const [metrics, setMetrics] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) return;
    fetchDashboardData();
  }, [user, isAdmin]);

  const fetchDashboardData = async () => {
    try {
      const [metricsRes, trendsRes] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/admin/trends'),
      ]);

      if (!metricsRes.ok || !trendsRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const metricsData = await metricsRes.json();
      const trendsData = await trendsRes.json();

      setMetrics(metricsData);
      setTrends(trendsData.trends);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { metrics, trends, loading };
}
