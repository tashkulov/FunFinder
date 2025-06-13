export type EventEntity = {
    id: string; // UUID строкой
    title: string;
    description: string;
    location: string;
    start_time: string; // ISO-строка даты
    created_at: string;
    price: number;
    price_currency: string;
    minimum_age: number;
    amount_of_places: number;
    amount_of_available_places: number;
    image: string;  // тут уже не image_url, а image
    image_url: string;

    amount_of_likes: number;
    amount_of_dislikes: number;
    isLiked: boolean;
    isDisliked: boolean;

    categories: {
        name: string;
    }[];

    comments: {
        authorId: string;
        authorImage: string;
        authorFirstName: string;
        authorLastName: string;
        commentId: string;
        comment: string;
        commentDate: string;
    }[];
};
