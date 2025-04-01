export type BookData = {
  title: string;
  caption: string;
  rating: number;
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
