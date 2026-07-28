import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    // Bilingual display titles
    title: z.string(),
    titleCN: z.string().optional().default(''),

    // Metadata
    year: z.number(),
    featured: z.boolean().default(false),

    // Categorization
    category: z.string().optional(),
    domain: z.string().optional(),
    projectType: z.string().optional(),

    // Role
    role: z.string().optional(),
    roleCN: z.string().optional(),

    // Short tagline for listing cards
    tagline: z.string().optional(),

    // Cover image filename (relative to public/images/projects/{slug}/)
    cover: z.string().optional().default('cover.png'),

    // Technologies (flat array for frontmatter simplicity)
    technologies: z.array(z.string()).optional().default([]),

    // Links
    demoUrl: z.string().optional(),

    // Exhibition / Publication / Awards
    exhibition: z.string().optional(),
    publication: z.string().optional(),
    awards: z.string().optional(),
  }),
});

export const collections = { projects };
