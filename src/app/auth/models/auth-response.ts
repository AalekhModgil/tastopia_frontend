export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    profileImageUrl: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  };
  token: string;
}