export type User = {
    id: string;
    name: string;
    email: string;
    selfDescription: string
    birthday: string;
    role: string;
    profilePictureUrl?: string
}

export type UserStats = {
    totalPosts: number;
    totalAds: number;
    totalComments: number;
    totalFriends: number;
    totalMessages: number;
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

export type UserFriend = {
    id: string;
    name: string;
    profilePictureUrl?: string;
    selfDescription: string;
}

export type Post = {
    id: string;
    content: string;
    createdAt: string;
    userName: string;
    userId: string;
    profilePictureUrl: string | null;
    mediaUrls: string[];
    commentCount: number;
    likeCount: number;
}

export type Likes = {

}

export type Comment = {
    id: string;
    content: string;
    createdAt: string;
    userName: string;
    userId: string;
    postId?: string;
    parentCommentId?: string;
    replyCount: number;
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

export type PendingFriendshipDto = {
    friendshipId: string;
    status: string;
    createdAt: string;
    otherUser: UserFriend;
}

export type Ad = {
    id: string;
    title: string;
    price: number;
    description?: string;
    createdAt: string;
    adType: "Service" | "Product" | 1 | 0;
    location: string;
    categories: string[];
    mediaUrls: string[];
    userId: string;
    user?: User;
    reservations?: AdReservation[];
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

export type MediaItem = {
    id?: string
    url: string
    isVideo?: boolean
}
