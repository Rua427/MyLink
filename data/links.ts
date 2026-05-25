export interface Link {
  id: string
  title: string
  url: string
  clickCount: number
  createdAt: string
  updatedAt: string
}

export const dummyLinks: Link[] = [
  {
    id: "link-1",
    title: "인스타그램",
    url: "https://instagram.com/example",
    clickCount: 120,
    createdAt: "2026-05-20T10:00:00Z",
    updatedAt: "2026-05-20T10:00:00Z",
  },
  {
    id: "link-2",
    title: "유튜브",
    url: "https://youtube.com/example",
    clickCount: 350,
    createdAt: "2026-05-21T11:30:00Z",
    updatedAt: "2026-05-22T09:15:00Z",
  },
  {
    id: "link-3",
    title: "블로그",
    url: "https://blog.naver.com/example",
    clickCount: 85,
    createdAt: "2026-05-22T14:20:00Z",
    updatedAt: "2026-05-22T14:20:00Z",
  },
  {
    id: "link-4",
    title: "Github",
    url: "https://github.com/example",
    clickCount: 420,
    createdAt: "2026-05-23T09:00:00Z",
    updatedAt: "2026-05-25T10:10:00Z",
  },
  {
    id: "link-5",
    title: "포트폴리오",
    url: "https://example.com/portfolio",
    clickCount: 55,
    createdAt: "2026-05-24T16:45:00Z",
    updatedAt: "2026-05-24T16:45:00Z",
  },
]
