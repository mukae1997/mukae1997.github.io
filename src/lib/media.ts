import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

export const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
export const videoExtensions = new Set(['.mp4', '.webm', '.mov', '.m4v']);

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  ratio: string;
  shape: 'wide' | 'tall' | 'square';
}

/** Read binary image header to determine aspect ratio. Returns 1 for unknown formats. */
export function getImageRatio(filePath: string): number {
  const bytes = readFileSync(filePath);

  // PNG
  if (bytes.subarray(1, 4).toString() === 'PNG') {
    return bytes.readUInt32BE(16) / bytes.readUInt32BE(20);
  }

  // GIF
  if (bytes.subarray(0, 3).toString() === 'GIF') {
    return bytes.readUInt16LE(6) / bytes.readUInt16LE(8);
  }

  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset < bytes.length - 9) {
      if (bytes[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = bytes[offset + 1];
      const length = bytes.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return bytes.readUInt16BE(offset + 7) / bytes.readUInt16BE(offset + 5);
      }
      offset += 2 + length;
    }
  }

  return 1;
}

export function getMediaShape(ratio: number): 'wide' | 'tall' | 'square' {
  if (ratio > 1.25) return 'wide';
  if (ratio < 0.8) return 'tall';
  return 'square';
}

function stableNumber(value: string): number {
  return [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 0);
}

export interface GalleryOptions {
  /** Max items to return (default 4). */
  max?: number;
  /**
   * squarify: force some tiles to square for a dense gallery grid (homepage style).
   * natural: return true aspect ratios without clamping.
   */
  mode?: 'squarify' | 'natural';
  /**
   * 'home': read only from {slug}/home/ subdirectory.
   * undefined: read from {slug}/ AND {slug}/home/ (merged, deduped).
   */
  source?: 'home';
  /** Exclude the cover image from results (default false). */
  excludeCover?: boolean;
}

function listFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((file) => {
    const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
    return imageExtensions.has(ext) || videoExtensions.has(ext);
  });
}

/** Collect media files from a project's image folder(s). */
export function getProjectMedia(
  slug: string,
  coverFilename?: string | null,
  options: GalleryOptions = {},
): MediaItem[] {
  const { max = 4, mode = 'squarify', source, excludeCover = false } = options;
  const cover = coverFilename || 'cover.png';
  const folder = resolve('./public/images/projects', slug);

  if (!slug || !existsSync(folder)) return [];

  // Build list of { fileName, subfolder } entries
  let entries: { file: string; sub: string }[] = [];

  if (source === 'home') {
    const homeDir = resolve(folder, 'home');
    if (existsSync(homeDir)) {
      entries = listFiles(homeDir).map((f) => ({ file: f, sub: 'home' }));
    }
  } else {
    // Default: merge root + home
    entries = listFiles(folder).map((f) => ({ file: f, sub: '' }));
    const homeDir = resolve(folder, 'home');
    if (existsSync(homeDir)) {
      const homeFiles = listFiles(homeDir).map((f) => ({ file: f, sub: 'home' }));
      const rootNames = new Set(entries.map((e) => e.file));
      for (const hf of homeFiles) {
        if (!rootNames.has(hf.file)) entries.push(hf);
      }
    }
  }

  // Exclude cover if requested
  if (excludeCover) {
    entries = entries.filter((e) => e.file !== cover);
  }

  // Sort, prioritize cover first
  entries.sort((a, b) => a.file.localeCompare(b.file));
  const coverEntry = entries.find((e) => e.file === cover);
  const otherEntries = entries.filter((e) => e.file !== cover);
  const ordered = coverEntry ? [coverEntry, ...otherEntries] : otherEntries;

  const available = ordered.slice(0, max);
  if (available.length === 0) return [];

  const seed = stableNumber(slug);
  const squareIndexes = new Set(mode === 'squarify' ? [seed % available.length] : []);
  if (mode === 'squarify' && available.length >= 4) {
    squareIndexes.add((seed + 2) % available.length);
  }

  return available.map((entry, index) => {
    const ext = entry.file.slice(entry.file.lastIndexOf('.')).toLowerCase();
    const isVideo = videoExtensions.has(ext);
    const mediaDir = entry.sub === 'home' ? resolve(folder, 'home') : folder;
    const sourceRatio = isVideo ? 16 / 9 : getImageRatio(resolve(mediaDir, entry.file));
    const ratio = squareIndexes.has(index) ? 1 : sourceRatio;
    const srcPrefix = entry.sub === 'home' ? `/images/projects/${slug}/home/` : `/images/projects/${slug}/`;
    return {
      type: isVideo ? 'video' : 'image',
      src: `${srcPrefix}${encodeURIComponent(entry.file)}?v=20260726-3`,
      ratio: mode === 'natural' ? ratio.toFixed(3) : Math.max(0.4, Math.min(2.5, ratio)).toFixed(3),
      shape: getMediaShape(ratio),
    };
  });
}
