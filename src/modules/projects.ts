export type Project = {
  url: string
  name: string
  description: string
  /** Internal write-up, for the ones that have more to say than a line. */
  page?: string
}

export const projects: Record<string, Project[]> = {
  opensource: [
    {
      url: 'https://github.com/LikithSh3tty/Agenvo',
      name: 'agenvo',
      description:
        'agency income tracker that splits every sale, with a LangGraph assistant that answers from your real numbers',
    },
    {
      url: 'https://github.com/LikithSh3tty/Cloudnest',
      name: 'cloudnest',
      description:
        'support agent with self-contained semantic retrieval, RRF fusion and escalation to a ticket queue',
    },
    {
      url: 'https://github.com/LikithSh3tty/DriftBell',
      name: 'driftbell',
      description:
        'ML drift watchman on n8n and LangGraph that investigates before it acts, and asks you first',
      page: '/open-source/driftbell/',
    },
    {
      url: 'https://github.com/LikithSh3tty/Grid0pt',
      name: 'grid0pt',
      description:
        'grid packing optimizer that sweeps every offset and rotation to fit the most whole cells in a polygon',
    },
    {
      url: 'https://github.com/LikithSh3tty/Indoor-Mall-Navigation',
      name: 'invision',
      description:
        'indoor mall navigation from one photo of a shopfront, fusing CLIP retrieval with the signage text, then routing you across floors',
    },
    {
      url: 'https://github.com/LikithSh3tty/devanagari-cnn',
      name: 'devanagari-cnn',
      description:
        'convolutional net written from scratch that reads all 46 handwritten Devanagari characters, taught on a hundred examples each',
    },
    {
      url: 'https://github.com/LikithSh3tty/LikithSh3tty',
      name: 'this profile',
      description:
        'a GitHub profile that draws itself. heatmap, ASCII portrait and info card rendered as SVG by a daily action',
    },
  ],
  sites: [
    {
      url: 'https://agenvox.vercel.app',
      name: 'agenvo',
      description: 'the income tracker, live',
    },
    {
      url: 'https://cloudnest-nine.vercel.app',
      name: 'cloudnest',
      description: 'the support desk, live',
    },
    {
      url: 'https://driftbell.vercel.app',
      name: 'driftbell',
      description: 'the drift watchman, live',
    },
    {
      url: 'https://github.com/LikithSh3tty/likithshetty.com',
      name: 'this website',
      description: 'a television. astro, svelte, and rather a lot of scanlines',
    },
  ],
} as const
