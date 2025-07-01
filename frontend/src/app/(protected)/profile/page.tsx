'use client'


import Media from "@/app/components/media/media"
import EditProfileForm from "@/app/components/profile/editProfileForm"
import ProfileDetails from "@/app/components/profile/profileDetails"
import ProfileStats from "@/app/components/profile/profileStats"
import ProfileTabSelector from "@/app/components/profile/profiletabselector"
import { useAuth } from "@/hooks/useAuth"
import { ProfileView } from "@/types/types"
import { useEffect, useState } from "react"


const ProfilePage = () => {
    const [selectedTab, setSelectedTab] = useState<ProfileView>("Profile")
    const [editing, setEditing] = useState<boolean>(false)
    const { user } = useAuth()
    const [signedUrl, setSignedUrl] = useState<string | null>(null)

    const fetchSignedUrl = async () => {
        if (!user?.profilePictureUrl) return

        const res = await fetch("/api/User/me/profile-picture-url", {
            credentials: "include"
        })

        const data = await res.json()
        setSignedUrl(data.url)
    }

    useEffect(() => {
        fetchSignedUrl()
    }, [user?.profilePictureUrl])


    if (!user) return

    return (
        <main className="pt-10 p-4 text-black text-3xl">

            <ProfileTabSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            {selectedTab == "Profile" && <>
                {editing ? <EditProfileForm setEditing={setEditing} signedUrl={signedUrl} /> : <ProfileDetails setEditing={setEditing} signedUrl={signedUrl} />}
                <ProfileStats />
            </>}
            {selectedTab == "Gallery" && <Media isVideo={false}/>}
            {selectedTab == "Videos" && <Media isVideo={true}/>}

        </main>
    )
}

export default ProfilePage