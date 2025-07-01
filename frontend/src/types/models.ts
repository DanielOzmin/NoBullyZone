export type User = {
    id: string;
    name: string;
    passwordHash: string;
    email: string;
    selfDescription: string
    birthday: string;
    role: string;
    profilePictureUrl?: string

    albums: Album[];

    posts: Post[];
    ads: Ad[];
    sentRequests: Friendship[];
    receivedRequests: Friendship[];
}

export type UserImage = {
    id: string;
    url: string;
    userId: string;
}

export type UserVideo = {
    id: string;
    url: string;
    userId: string;
}

export type Post = {
    id: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
    userId: string;
    user: User;
    comments: Comment[];
}

export type Comment = {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
    user: User;
    postId: string;
    post: Post;
}


export type Friendship = {
    id: string;
    requesterId: string;
    requester: User;
    addresseeId: string;
    addressee: User;
    status: string;
    createdAt: string;
}

export type Ad = {
    id: string;
    title: string;
    price: string;
    description?: string;
    createdAt: string;
    userId: string;
    user: User;
    reservations: AdReservation[];
}

export type AdReservation = {
    id: string;
    adId: string;
    ad: Ad;
    userId: string;
    user: User;
    message?: string;
    createdAt: string;
}

export type Media = {
    id: string
    url: string
    isVideo: boolean
    uploadedAt: string
}

export type Album = {
    id: string
    title: string
    isVideo: boolean,
    createdAt: string
    mediaItems: Media[]
}
