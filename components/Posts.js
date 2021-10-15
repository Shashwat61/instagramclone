import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import {db} from '../firebase'
import { useEffect, useState } from "react"
import Post from "./Post"

// const posts=[
//     {
//         id:'123',
//         username:'shash',
//         userImg:'https://links.papareact.com/3ke',
//         img:'https://links.papareact.com/3ke',
//         caption:'This is dope',
//     },
//     {
//         id:'123',
//         username:'shash',
//         userImg:'https://links.papareact.com/3ke',
//         img:'https://links.papareact.com/3ke',
//         caption:'This is dope',
//     },
//     {
//         id:'123',
//         username:'shash',
//         userImg:'https://links.papareact.com/3ke',
//         img:'https://links.papareact.com/3ke',
//         caption:'This is dope',
//     },
// ]
function Posts() {
    const [posts,setPosts]=useState(null)
    useEffect(()=>
        onSnapshot(query(collection(db,'posts'), orderBy('timestamp','desc')), snapshot=>{
            setPosts(snapshot.docs) 
        }),[db])
        console.log(posts)
    return (
        <div>
            {posts?.map((post)=>(
                <Post key={post.id} id={post.id} userImg={post.data().profileImg} username={post.data().username} img={post.data().image} caption={post.data().caption} />

                ))}
            {/* post */}
            {/* post */}
            {/* post */}
            {/* post */}
            {/* post */}
        </div>
    )
}

export default Posts
