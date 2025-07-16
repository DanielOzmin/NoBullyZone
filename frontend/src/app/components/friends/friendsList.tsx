import { PendingFriendshipDto, User, UserFriend } from "@/types/models"
import FriendCard from "./friendCard"


type FriendsListProps = {
    friends: UserFriend[]
    friendRequests: {
        receivedRequests: PendingFriendshipDto[],
        sentRequests: PendingFriendshipDto[]
    }
    allUser: UserFriend[]
    searchMode: "friends" | "all"
    isRequestMode?: boolean
    onChoose?: (friendshipId: string, accepted: boolean) => void
}

const FriendsList = ({ friends, allUser, searchMode, friendRequests, isRequestMode = false, onChoose }: FriendsListProps) => {
    const baseList = searchMode === "friends" ? friends : allUser
    if (isRequestMode) {
        return (
            <div className="space-y-8 p-4">
                <section>
                    <h2 className="text-xl font-semibold mb-2">Received friend requests</h2>
                    {friendRequests.receivedRequests.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {friendRequests.receivedRequests.map((f) => (
                                <li key={f.otherUser.id}>
                                    <FriendCard
                                        friend={f.otherUser}
                                        requestId={f.friendshipId}
                                        isRequestMode={true}
                                        onChoose={onChoose}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">You have no received friend requests.</p>
                    )}
                </section>

               
                <section>
                    <h2 className="text-xl font-semibold mb-2">Sent friend requests</h2>
                    {friendRequests.sentRequests.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {friendRequests.sentRequests.map((f) => (
                                <li key={f.otherUser.id}>
                                    <FriendCard
                                        friend={f.otherUser}
                                        requestId={f.friendshipId}
                                        isRequestMode={false}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500"> You have no sent friend requests.</p>
                    )}
                </section>
            </div>
        )
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {baseList.map((friend) => (
                <li key={friend.id}>
                    <FriendCard friend={friend} />
                </li>
            ))}
        </ul>
    )
}

export default FriendsList