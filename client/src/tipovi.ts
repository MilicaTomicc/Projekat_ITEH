
export interface Comment {
  id?: number,
  postId?: number,
  userId: number,
  content: string,
  user?: User
}

export interface Message {
  id: number,
  content: string,
  createdAt: string,
  senderId: number,
  receiverId: number,
  sender?: User,
  receiver?: User
}

export interface Post {
  id?: number,
  title: string,
  postCategoryId: number,
  userId: number,
  content: string,
  user?: User,
  postCategory?: PostCategory,
  comments?: Comment[],
}
export interface PostCategory {
  id: number,
  value: string
}
export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  admin: boolean,
  imageUrl?: string,
  posts?: Post[]
}