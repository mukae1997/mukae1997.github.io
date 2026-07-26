const fs = require('fs');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = '2ef17ada815280088be8dd3de4e9141a';
const CSV_PATH = 'src/data/projects-master.csv';

// Publication relation ID → our CSV pub ID
const PUB_ID_MAP = {
  '2ef17ada-8152-8092-99c4-fa84a39aa336': 'chi-2025-i-like-your-story',
};

// ── CSV helpers ──────────────────────────────────────────

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
    else { current += char; }
  }
  values.push(current.trim());
  return values;
}

function csvEscape(val) {
  const s = String(val).replace(/\n/g, ' ').replace(/\r/g, '');
  if (s.includes(',') || s.includes('"'))
    return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

// ── Notion helpers ───────────────────────────────────────

function notionText(prop) {
  if (!prop) return '';
  if (prop.type === 'title' || prop.type === 'rich_text')
    return (prop.title || prop.rich_text || []).map(t => t.plain_text).join('');
  return '';
}

function notionSelect(prop) {
  if (!prop || prop.type !== 'select') return '';
  return prop.select?.name || '';
}

function notionMultiSelect(prop) {
  if (!prop || prop.type !== 'multi_select') return '';
  return prop.multi_select.map(s => s.name).join(', ');
}

function notionDate(prop) {
  if (!prop || prop.type !== 'date') return '';
  return prop.date?.start || '';
}

function notionNumber(prop) {
  if (!prop || prop.type !== 'number') return '';
  return prop.number != null ? String(prop.number) : '';
}

function notionRelation(prop) {
  if (!prop || prop.type !== 'relation') return [];
  return (prop.relation || []).map(r => r.id);
}

function notionFiles(prop) {
  if (!prop || prop.type !== 'files') return '';
  return prop.files.map(f => f.name).join(', ');
}

// ── Build fallback map from existing CSV ─────────────────

function readCSVFallback() {
  if (!fs.existsSync(CSV_PATH)) return {};
  const csv = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = csv.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const idx = (name) => headers.indexOf(name);

  const map = {};
  for (let i = 1; i < lines.length; i++) {
    const v = parseCSVLine(lines[i]);
    if (v.length < 5) continue;
    const name = v[idx('Project Name')] || '';
    map[name] = {
      slug: v[idx('slug')] || '',
      display: v[idx('Display')] || 'false',
      featured: v[idx('Featured')] || 'false',
      cover: v[idx('Cover')] || '',
      exhibition: v[idx('Exhibition')] || '',
      publication: v[idx('Publication')] || '',
    };
  }
  return map;
}

// ── Match Notion row → CSV fallback ──────────────────────

function normalize(s) {
  return s.replace(/[\s·，,]+/g, '').toLowerCase();
}

function findFallback(notionName, fallbackMap) {
  // Check manual name mapping first
  const mappedName = NAME_MAP[notionName] || notionName;
  if (fallbackMap[mappedName]) return fallbackMap[mappedName];
  if (fallbackMap[notionName]) return fallbackMap[notionName];
  const normNotion = normalize(notionName);

  // Score each CSV name by similarity
  let best = null;
  let bestScore = 0;

  for (const [csvName, info] of Object.entries(fallbackMap)) {
    const normCSV = normalize(csvName);
    let score = 0;

    // Exact normalized match
    if (normCSV === normNotion) { score = 100; }
    // One starts with the other
    else if (normCSV.startsWith(normNotion) || normNotion.startsWith(normCSV)) { score = 80; }
    // Extract Chinese prefix (first 2-4 chars) and compare
    else {
      const cnPrefix = notionName.match(/^[一-鿿]{2,4}/);
      if (cnPrefix && csvName.startsWith(cnPrefix[0])) { score = 60; }
      // Check if first N chars match
      const firstN = Math.min(4, notionName.length);
      if (csvName.slice(0, firstN) === notionName.slice(0, firstN)) { score = 50; }
    }

    if (score > bestScore) {
      bestScore = score;
      best = info;
    }
  }

  return bestScore >= 50 ? best : null;
}

// ── Fetch Notion ─────────────────────────────────────────

async function fetchNotion() {
  const url = `https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_size: 100 }),
  });
  return res.json();
}

// Manual name mappings: Notion name → CSV name (for edge cases)
const NAME_MAP = {
  '意识抗体2022': 'Consciousness Antibody 2022',
};
// Fix bad slugs from old CSV
const SLUG_FIX = {
  'consciousness-antibody-2022，意识抗体 2022': 'consciousness-antibody-2022',
};

// ── Main ──────────────────────────────────────────────────

async function main() {
  if (!NOTION_TOKEN) {
    throw new Error('Missing NOTION_TOKEN. Set it before running the Notion sync.');
  }
  console.log('Fetching from Notion...');
  const notionData = await fetchNotion();
  if (notionData.object === 'error') {
    console.error('Notion API error:', notionData.message);
    process.exit(1);
  }
  console.log('  Got', notionData.results.length, 'rows');

  console.log('Reading existing CSV fallback...');
  const fallback = readCSVFallback();
  console.log('  Got', Object.keys(fallback).length, 'entries');

  const headers = [
    'slug', 'Project Name', 'Project Name EN', 'Display', 'Featured',
    'year', 'Project Type', 'Category', 'Portfolio Category', 'Domain', 'Core Engine',
    'Hardware & Sensors', 'Programming Languages & Frameworks',
    'Artist/Collaborator', 'Role', 'RoleCN', 'Timeline', 'Company',
    'Overview', 'OverviewCN',
    'Achievements', 'TechDetails', 'Technologies',
    'Exhibition', 'Publication', 'Cover'
  ];

  const rows = [];
  const matched = [];

  for (const row of notionData.results) {
    const p = row.properties;
    const name = notionText(p['Project Name']);
    if (!name || name === '0') continue;

    const fb = findFallback(name, fallback) || {};
    if (!fb.slug) {
      console.log('  NEW (no slug):', name);
    } else {
      matched.push(name);
    }

    // Core data from Notion
    const nameEN = notionText(p['ProjectNameEN']);
    const year = notionNumber(p['年份']);
    const projType = notionSelect(p['Project Type']);
    const category = notionSelect(p['Category']);
    const portfolioCategory = notionSelect(p['Portfolio Category']);
    const domain = notionMultiSelect(p['Domain']);
    const coreEngine = notionMultiSelect(p['Core Engine']);
    const hardware = notionMultiSelect(p['Hardware & Sensors']);
    const progLang = notionMultiSelect(p['Programming Languages & Frameworks']);
    const artist = notionText(p['Artist/Collaborator']);
    const role = notionMultiSelect(p['核心角色 Role']);
    const startDate = notionDate(p['Start Date']);
    const endDate = notionDate(p['End Date']);
    const timeline = [startDate, endDate].filter(Boolean).join(' - ');
    const overview = notionText(p['Project Description']);
    const specTech = notionText(p['Specialized Tech Modules']);
    const techFeatures = notionText(p['技术特点']);

    // Exhibition: prefer Notion, fallback to CSV
    const exhibitionNotion = notionMultiSelect(p['Exhibition']);
    const exhibition = exhibitionNotion || fb.exhibition || '';

    // Publication: prefer Notion relation, fallback to CSV
    const pubNotionIds = notionRelation(p['Publication']);
    const pubFromNotion = pubNotionIds.map(id => PUB_ID_MAP[id] || id).filter(Boolean).join(', ');
    const publication = pubFromNotion || fb.publication || '';

    // Technologies: additional tech NOT already in Core/Programming (e.g. hardware, protocols, libraries)
    const coreProgSet = new Set([
      ...coreEngine.split(', ').filter(Boolean).map(s => s.toLowerCase()),
      ...progLang.split(', ').filter(Boolean).map(s => s.toLowerCase()),
    ]);
    const additionalTech = [
      ...hardware.split(', ').filter(Boolean),
      ...specTech.split(/[,|]/).map(s => s.trim()).filter(Boolean),
    ].filter(t => !coreProgSet.has(t.toLowerCase()));
    const technologies = [...new Set(additionalTech)].join('|');

    let slug = fb.slug || '';
    if (SLUG_FIX[slug]) slug = SLUG_FIX[slug];

    const vals = [
      slug,
      name,
      nameEN,
      fb.display || 'false',
      fb.featured || 'false',
      year,
      projType,
      category,
      portfolioCategory,
      domain,
      coreEngine,
      hardware,
      progLang,
      artist,
      role,
      '',           // RoleCN
      timeline,
      '',           // Company
      overview,
      '',           // OverviewCN
      '',           // Achievements
      '',           // TechDetails
      technologies,
      exhibition,
      publication,
      fb.cover || '',
    ];

    rows.push(vals.map(csvEscape).join(','));
  }

  const output = [headers.join(','), ...rows].join('\n') + '\n';
  fs.writeFileSync(CSV_PATH, output);

  console.log('  Written:', rows.length, 'projects to', CSV_PATH);
  console.log('  Matched:', matched.length, '| New:', rows.length - matched.length);
  console.log('Done!');
}

main().catch(err => { console.error(err); process.exit(1); });
