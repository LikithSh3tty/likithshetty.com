export type Project = {
  url: string
  name: string
  description: string
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
    },
    {
      url: 'https://github.com/LikithSh3tty/Grid0pt',
      name: 'grid0pt',
      description:
        'grid packing optimizer that sweeps every offset and rotation to fit the most whole cells in a polygon',
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
      url: 'https://github.com/LikithSh3tty/Portfolio',
      name: 'this website',
      description:
        'a television. built on <a href="https://github.com/kaisermann/kaisermann" target="_blank" rel="noopener noreferrer">kaisermann.me</a>',
    },
  ],
} as const
