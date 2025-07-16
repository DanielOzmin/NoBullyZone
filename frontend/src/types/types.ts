import { User } from "./models";

export type ProfileView = "Profile" | "Gallery" | "Videos";

export type SelectorProps = {
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<ProfileView>>;
}

export type ProfileEditProps = {
    signedUrl: string | null,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export type FriendshipStatus = "Accepted" | "Rejected" | "Pending" | "NoFriendship"

export type FriendshipType = {
    friendshipId?: string
    status: FriendshipStatus
    isRecieved: boolean
}