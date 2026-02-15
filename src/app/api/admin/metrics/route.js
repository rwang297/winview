import { isAdminSession } from '@/app/api/utils/admin';
import sql from '@/app/api/utils/sql';
import { auth } from '@/auth';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can access metrics
    const isAdmin = await isAdminSession(session);
    if (!isAdmin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get total accounts
    const totalAccountsResult = await sql`
      SELECT COUNT(*) as count FROM accounts
    `;
    const totalAccounts = Number.parseInt(totalAccountsResult[0].count);

    // Get accounts created this month
    const thisMonthResult = await sql`
      SELECT COUNT(*) as count 
      FROM accounts 
      WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
    `;
    const thisMonth = Number.parseInt(thisMonthResult[0].count);

    // Get total complaints
    const totalComplaintsResult = await sql`
      SELECT COUNT(*) as count FROM complaints
    `;
    const totalComplaints = Number.parseInt(totalComplaintsResult[0].count);

    // NEW: form submission counts
    const ippisCountRes = await sql`SELECT COUNT(*) as count FROM ippis_applications`;
    const totalIppisApplications = Number.parseInt(ippisCountRes[0].count);

    // These tables may not exist yet on first deploy; guard with 0 if query fails
    let totalSectionB = 0;
    let totalSectionC = 0;
    let totalSectionD = 0;
    try {
      const r = await sql`SELECT COUNT(*) as count FROM account_opening_b`;
      totalSectionB = Number.parseInt(r[0].count);
    } catch (_) {}
    try {
      const r = await sql`SELECT COUNT(*) as count FROM account_mandate_c`;
      totalSectionC = Number.parseInt(r[0].count);
    } catch (_) {}
    try {
      const r = await sql`SELECT COUNT(*) as count FROM reference_forms_d`;
      totalSectionD = Number.parseInt(r[0].count);
    } catch (_) {}

    // Get demographics by gender
    const genderData = await sql`
      SELECT gender, COUNT(*) as count 
      FROM accounts 
      GROUP BY gender
    `;

    // Get demographics by occupation
    const occupationData = await sql`
      SELECT occupation, COUNT(*) as count 
      FROM accounts 
      GROUP BY occupation
      ORDER BY count DESC
      LIMIT 10
    `;

    // Get age distribution
    const ageData = await sql`
      SELECT 
        CASE 
          WHEN age < 25 THEN '18-24'
          WHEN age BETWEEN 25 AND 34 THEN '25-34'
          WHEN age BETWEEN 35 AND 44 THEN '35-44'
          WHEN age BETWEEN 45 AND 54 THEN '45-54'
          WHEN age BETWEEN 55 AND 64 THEN '55-64'
          ELSE '65+'
        END as age_group,
        COUNT(*) as count
      FROM accounts
      GROUP BY age_group
      ORDER BY age_group
    `;

    // =========================
    // NEW: IPPIS-focused metrics
    // =========================
    const ippisThisMonthRes = await sql`
      SELECT COUNT(*) as count 
      FROM ippis_applications 
      WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
    `;
    const ippisThisMonth = Number.parseInt(ippisThisMonthRes[0].count);

    const ippisPoliceIdRes = await sql`
      SELECT COUNT(*) as count 
      FROM ippis_applications 
      WHERE has_police_id = true
    `;
    const ippisWithPoliceId = Number.parseInt(ippisPoliceIdRes[0].count);

    // Automobile distribution
    const ippisAutoDist = await sql`
      SELECT COALESCE(automobile_type, 'unspecified') as automobile_type, COUNT(*) as count
      FROM ippis_applications
      GROUP BY automobile_type
      ORDER BY count DESC
    `;

    // Average monthly repayment
    const avgRepaymentRes = await sql`
      SELECT COALESCE(AVG(NULLIF(monthly_repayment::numeric, 0)), 0) as avg
      FROM ippis_applications
    `;
    const avgMonthlyRepayment = Number(avgRepaymentRes[0].avg) || 0;

    // Total savings (sum); also break down components
    const savingsAgg = await sql`
      SELECT 
        COALESCE(SUM(compulsory_savings::numeric), 0) as compulsory_sum,
        COALESCE(SUM(voluntary_savings::numeric), 0) as voluntary_sum,
        COALESCE(SUM(total_savings::numeric), 0) as total_sum
      FROM ippis_applications
    `;
    const ippisSavings = {
      compulsory: Number(savingsAgg[0].compulsory_sum) || 0,
      voluntary: Number(savingsAgg[0].voluntary_sum) || 0,
      total: Number(savingsAgg[0].total_sum) || 0,
    };

    // Top ranks
    const ippisTopRanks = await sql`
      SELECT rank, COUNT(*) as count
      FROM ippis_applications
      WHERE rank IS NOT NULL AND rank <> ''
      GROUP BY rank
      ORDER BY count DESC
      LIMIT 5
    `;

    // Top pay points
    const ippisTopPayPoints = await sql`
      SELECT pay_point, COUNT(*) as count
      FROM ippis_applications
      WHERE pay_point IS NOT NULL AND pay_point <> ''
      GROUP BY pay_point
      ORDER BY count DESC
      LIMIT 5
    `;

    // By state
    const ippisByState = await sql`
      SELECT state, COUNT(*) as count
      FROM ippis_applications
      WHERE state IS NOT NULL AND state <> ''
      GROUP BY state
      ORDER BY count DESC
      LIMIT 10
    `;

    return Response.json({
      totalAccounts,
      thisMonth,
      totalComplaints,
      totalIppisApplications,
      totalSectionB,
      totalSectionC,
      totalSectionD,
      demographics: {
        byGender: genderData,
        byOccupation: occupationData,
        byAge: ageData,
      },
      // NEW: expose IPPIS insight block
      ippis: {
        thisMonth: ippisThisMonth,
        withPoliceId: ippisWithPoliceId,
        automobile: ippisAutoDist,
        avgMonthlyRepayment,
        savings: ippisSavings,
        topRanks: ippisTopRanks,
        topPayPoints: ippisTopPayPoints,
        byState: ippisByState,
      },
    });
  } catch (error) {
    console.error('Error fetching admin metrics:', error);
    return Response.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
