import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface Project {
  slug: string;
  projectName: string;
  projectNameEN: string;
  display: string;
  featured: string;
  year: string;
  projectType: string;
  category: string;
  domain: string;
  coreEngine: string;
  hardwareSensors: string;
  programmingLanguages: string;
  artistCollaborator: string;
  role: string;
  roleCN: string;
  timeline: string;
  company: string;
  overview: string;
  overviewCN: string;
  achievements: string;
  techDetails: string;
  technologies: string;
  exhibition: string;
  publication: string;
  cover: string;
  // Extended fields from Notion sync
  portfolioCategory?: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  url: string;
}

function headersFromLine(line: string): string[] {
  const headers: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      headers.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  headers.push(current.trim());
  return headers;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

/** Parse the master projects CSV into a { slug → rawRecord } map. */
export function parseMasterCSV(csvText: string): Record<string, Record<string, string>> {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return {};

  const headers = headersFromLine(lines[0]);
  const projects: Record<string, Record<string, string>> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const values = parseCSVLine(line);
    if (values.length < headers.length) continue;

    const project: Record<string, string> = {};
    headers.forEach((header, index) => {
      project[header] = values[index] || '';
    });

    if (project.slug) {
      projects[project.slug] = project;
    }
  }

  return projects;
}

/** Map raw CSV column names to the typed Project interface. */
export function normalizeProject(raw: Record<string, string>): Project {
  return {
    slug: raw['slug'] || '',
    projectName: raw['Project Name'] || '',
    projectNameEN: raw['Project Name EN'] || '',
    display: raw['Display'] || '',
    featured: raw['Featured'] || '',
    year: raw['year'] || '',
    projectType: raw['Project Type'] || '',
    category: raw['Category'] || '',
    domain: raw['Domain'] || '',
    coreEngine: raw['Core Engine'] || '',
    hardwareSensors: raw['Hardware & Sensors'] || '',
    programmingLanguages: raw['Programming Languages & Frameworks'] || '',
    artistCollaborator: raw['Artist/Collaborator'] || '',
    role: raw['Role'] || '',
    roleCN: raw['RoleCN'] || '',
    timeline: raw['Timeline'] || '',
    company: raw['Company'] || '',
    overview: raw['Overview'] || '',
    overviewCN: raw['OverviewCN'] || '',
    achievements: raw['Achievements'] || '',
    techDetails: raw['TechDetails'] || '',
    technologies: raw['Technologies'] || '',
    exhibition: raw['Exhibition'] || '',
    publication: raw['Publication'] || '',
    cover: raw['Cover'] || '',
    portfolioCategory: raw['Portfolio Category'] || '',
  };
}

/** Read projects-master.csv from disk and return a { slug → Project } map. */
export function loadAllProjects(): Record<string, Project> {
  const csvPath = resolve('./src/data/projects-master.csv');
  const csvContent = readFileSync(csvPath, 'utf-8');
  const raw = parseMasterCSV(csvContent);
  return Object.fromEntries(
    Object.entries(raw).map(([slug, rawProject]) => [slug, normalizeProject(rawProject)]),
  );
}

/** Projects marked Display = true, sorted by year descending. */
export function getDisplayedProjects(): Project[] {
  const all = loadAllProjects();
  return Object.values(all)
    .filter((p) => ['true', '1', 'TRUE'].includes(p.display))
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
}

/** Projects marked Display = true AND Featured = true. */
export function getFeaturedProjects(): Project[] {
  return getDisplayedProjects().filter((p) => ['true', '1', 'TRUE'].includes(p.featured));
}

/** Parse publications CSV into a { id → Publication } map. */
export function parsePublicationsCSV(csvText: string): Record<string, Publication> {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return {};

  const headers = headersFromLine(lines[0]);
  const pubs: Record<string, Publication> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const values = parseCSVLine(line);
    if (values.length < headers.length) continue;

    const pub: Record<string, string> = {};
    headers.forEach((header, index) => {
      pub[header] = values[index] || '';
    });

    if (pub['id']) {
      pubs[pub['id']] = {
        id: pub['id'],
        title: pub['title'] || '',
        venue: pub['venue'] || '',
        year: pub['year'] || '',
        url: pub['url'] || '',
      };
    }
  }

  return pubs;
}

/** Load publications from disk. */
export function loadAllPublications(): Record<string, Publication> {
  const pubsPath = resolve('./src/data/publications.csv');
  const pubsContent = readFileSync(pubsPath, 'utf-8');
  return parsePublicationsCSV(pubsContent);
}

/** Get publications linked to a project by its publication IDs (comma-separated). */
export function getProjectPublications(project: Project): Publication[] {
  const allPubs = loadAllPublications();
  const result: Publication[] = [];
  if (project.publication && project.publication.trim()) {
    const pubIds = project.publication.split(',').map((s) => s.trim()).filter(Boolean);
    for (const id of pubIds) {
      if (allPubs[id]) {
        result.push(allPubs[id]);
      }
    }
  }
  return result;
}
