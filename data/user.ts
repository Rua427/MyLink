export interface User {
  id: string;
  email: string;
  username: string;
  photoURL: string;
  displayName: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export const dummyUser: User = {
  id: "abc123xyz456",
  email: "jane@gmail.com",
  username: "jane_doe",
  photoURL: "https://api.dicebear.com/9.x/notionists/svg?seed=Jane",
  displayName: "Jane Doe",
  bio: "프론트엔드 개발자입니다.",
  createdAt: "2026-05-25T17:10:24Z",
  updatedAt: "2026-05-25T17:10:24Z",
};
