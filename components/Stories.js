import { useEffect, useState } from "react"
import faker from 'faker'
import Story from "./Story"
import { session, useSession } from "next-auth/client"
function Stories() {
    const [suggestions,setSuggestions]=useState([])
    const [session]=useSession()
    useEffect(()=>{
        const suggestions=[...Array(20)].map((_,i)=>(
         {
             ...faker.helpers.contextualCard(),
             id:i,
         }
        ))
        setSuggestions(suggestions)
    },[])
    console.log(suggestions)
    return (
        <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-sm scrollbar-thin " >
            {session && (
                <Story img={session?.user?.image} username={session?.user?.name} />
            )}
            {suggestions.map(profile=>(
                <Story key={profile.id} img={profile.avatar} username={profile.username} />
            ))} 
        </div>
    )
}

export default Stories
