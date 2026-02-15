import { formatDate } from './formatDate';

export function printIppisApplication(record) {
  try {
    const name =
      record.applicant_full_name ||
      [record.surname, record.first_name, record.middle_name].filter(Boolean).join(' ');
    const w = window.open('', '_blank');
    if (!w) return;
    const css = `
      body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; color: #111; }
      .letterhead { text-align: center; margin-bottom: 24px; }
      .title { font-size: 20px; font-weight: 700; }
      .sub { color: #666; }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 24px; }
      .field { padding: 8px 0; border-bottom: 1px solid #eee; }
      .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #666; }
      .value { font-size: 14px; font-weight: 600; }
    `;
    const field = (label, val) => {
      const v = val ?? '—';
      return `<div class="field"><div class="label">${label}</div><div class="value">${String(v)}</div></div>`;
    };
    w.document.write(
      `<!doctype html><html><head><meta charset="utf-8"/><title>IPPIS Application</title><style>${css}</style></head><body>`
    );
    w.document.write(`
      <div class="letterhead">
        <div class="title">Winview Bank</div>
        <div class="sub">IPPIS Application Summary</div>
      </div>
      <div style="margin-bottom:16px;font-weight:700;font-size:16px">${name}</div>
      <div class="grid">
        ${field('Record ID', record.id)}
        ${field('Created', formatDate(record.created_at))}
        ${field('Rank', record.rank)}
        ${field('IPPIS Number', record.ippis_number)}
        ${field('Pay Point', record.pay_point)}
        ${field('Automobile Type', record.automobile_type)}
        ${field('Monthly Repayment', record.monthly_repayment)}
        ${field('Total Savings', record.total_savings)}
        ${field('Has Police ID', record.has_police_id === true ? 'Yes' : record.has_police_id === false ? 'No' : '—')}
        ${field('Telephone A', record.telephone_a)}
        ${field('Telephone B', record.telephone_b)}
        ${field('Personal Email', record.personal_email)}
        ${field('Residential Address', record.residential_address)}
        ${field('Permanent Address', record.permanent_address)}
        ${field('State', record.state)}
        ${field('LGA', record.lga)}
      </div>
    `);
    w.document.write(`</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  } catch (e) {
    console.error(e);
    alert('Could not open print view');
  }
}
