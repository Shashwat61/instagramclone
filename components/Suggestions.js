import { useEffect, useState } from "react"
import faker from 'faker'

function Suggestions() {
    const [suggestions,setSuggestions]=useState([])
    useEffect(()=>{
        const suggestions=[...Array(5)].map((_,i)=>(
            {
                ...faker.helpers.contextualCard(),
                id:i,
            }
        ))
        setSuggestions(suggestions)
    },[])
    console.log(suggestions)
    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between mb-5 text-sm">
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="font-semibold text-gray-600">See all</button>
            </div>
            {
                 suggestions.map(({id,avatar,username,company})=>(
                     <div key={id} className="flex items-center justify-between mt-3">
                         <img src={avatar} alt="" className="w-10 h-10 rounded-full border p-[2px]" alt="" />
                         <div className="flex-1 ml-4">
                             <h2 className="text-sm font-semibold">{username}</h2>
                             <h3 className="text-xs text-gray-400">{company.name}</h3>
                         </div>
                         <button className="text-xs font-bold text-blue-500">Follow</button>
                         
                     </div>
                 ))               
                 }
        </div>
    )
}

export default Suggestions
