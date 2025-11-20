
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  bio: string;
  profile_image_url: string;
  location: string;
  hearts_balance: number;
  is_verified: boolean;
  photos: UserPhoto[];
}

export interface UserPhoto {
  id: number;
  photo_url: string;
  is_primary: boolean;
}
