export type BookData = {
  title: string;
  caption: string;
  rating: number;
  userId: string;
};

export type Book = {
  title: string;
  caption: string;
  rating: number;
  image: string;
  imageBase64: string;
};

export type ProfileBoxProps = BookData & {
  id: string;
  userId: string;
  created_at: Date;
  image_url: string;
};

export type ItemData = BookData & {
  id: string;
  userId: string;
  created_at: Date;
  image_url: string;
  profiles: {
    profileImage: string;
    username: string;
  };
};

export type RatingPickerProps = {
  rating: number;
  setRating: (rating: number) => void;
  n?: number;
};

export type Profile = {
  id: string;
  profileImage: string;
  username: string;
  email: string;
  created_at: Date;
};
