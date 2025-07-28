export async function LikePost(id: string){
    try {
        const res = await fetch(`/api/Like/${id}`,{ method: "POST", credentials: "include"})
        const data = await res.json()
        if(!res.ok){
            throw new Error("something go wrong while post like: ", data. message)
        }
    } catch (error) {
        console.error("Unexpected error: ", error)
    }
}