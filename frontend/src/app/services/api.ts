type LikeUnLikeProps = {
    postId?: string
    commentId?: string
}

export async function DoLikeUnlike({postId, commentId}: LikeUnLikeProps){
    try {
        const url = postId ? `/api/Like/postlike/${postId}` : `/api/Like/commentlike/${commentId}`
        const res = await fetch(`${url}`,{ method: "POST", credentials: "include"})
        const data = await res.json()
        if(!res.ok){
            throw new Error("something go wrong while like ")
        }
        console.log(data)
        return data
    } catch (error) {
        console.error("Unexpected error: ", error)
    }
}

type LikesProps = {
    targetId: string
}

export async function Likes({targetId}: LikesProps){
    try {
        const res = await fetch(`/api/Like/likes/${targetId}`,{ credentials: "include"})
        const data = await res.json()
        if(!res.ok){
            throw new Error("something go wrong while get like count")
        }
        console.log(data)
        return data
    } catch (error) {
        console.error("Unexpected error: ", error)
    }
}

type CommentCountProps = {
    targetId: string
    isPost: boolean
}

export async function CommentCount({targetId, isPost}: CommentCountProps){
    try {
        const url = isPost ? 
        `/api/Comment/getcommentcount/${targetId}` : 
        `/api/Comment/getcommentcountincomment/${targetId}`
        const res = await fetch(`${url}`,{ credentials: "include"})
        const data = await res.json()
        if(!res.ok){
            throw new Error("something go wrong while get comment count")
        }
        console.log(data)
        return data
    } catch (error) {
        console.error("Unexpected error: ", error)
    }
}


