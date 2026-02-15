import { isAdminSession } from '@/app/api/utils/admin'; // ADD: admin check
import sql from '@/app/api/utils/sql';
import { auth } from '@/auth';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ADD: Only admins can access trends
    const isAdmin = await isAdminSession(session);
    if (!isAdmin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get monthly account creation trends for the last 12 months
    const trends = await sql`
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM') as month,
        COUNT(*) as count
      FROM accounts
      WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month ASC
    `;

    return Response.json({ trends });
  } catch (error) {
    console.error('Error fetching trends:', error);
    return Response.json({ error: 'Failed to fetch trends' }, { status: 500 });
  }
}
