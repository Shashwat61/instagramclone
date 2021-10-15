/* eslint-disable react/react-in-jsx-scope */
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore'
import {
    DotsHorizontalIcon,
    HeartIcon,
    ChatIcon,
    EmojiHappyIcon,
    PaperAirplaneIcon,
    BookmarkIcon
    
} from '@heroicons/react/outline'

import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Moment from 'react-moment'

function Post({id,userImg,img,username,caption}) {
   const [session]=useSession()
   const [comment,setComment]=useState('')
   const [comments,setComments]=useState([])
   const [likes,setLikes]=useState([])
   const [hasLiked,setHasLiked]=useState(false)

   useEffect(()=>
       onSnapshot(query(collection(db,"posts",id,"comments"), orderBy("timestamp", 'desc')),(snapshot)=>setComments(snapshot.docs))
   ,[db,id])
   
   useEffect(()=>
     onSnapshot(collection(db,'posts',id,'likes'),(snapshot)=>setLikes(snapshot.docs))
   ,[db,id])

   useEffect(()=>
       setHasLiked(likes.findIndex(like=>like.id==session?.user?.email)!==-1)
   ,[likes])
   
   
   const likePost=async ()=>{
       
       if(hasLiked) {
          await deleteDoc(doc(db,'posts', id, 'likes', session?.user?.email))      
        }else{
           
            await setDoc(doc(db, 'posts', id, 'likes',session?.user?.email),{
                username:session?.user?.name.split('').join(''),
            })
    
        }
}
        console.log(hasLiked)
   
   const sendComment=async (e)=>{
       e.preventDefault()
       
       const commentToSend=comment
       setComment('')
       await addDoc(collection(db,'posts',id, 'comments'), {
           comment:commentToSend,
           username:session?.user?.name.split('').join('').toLocaleLowerCase(),
           userImg:session?.user?.image,
           timestamp:serverTimestamp(),
       })
   }
    return (
        <div className="bg-white border rounded-sm my-7">
             {/* header */}
             <div className="flex items-center p-5">
                 <img className="object-contain w-12 h-12 p-1 mr-3 border rounded-full" src={userImg} alt=""/>
                 <p className="flex-1 font-bold" >{username}</p>
                 <DotsHorizontalIcon className="h-5"/>
             </div>
             {/* img */}
             <img src={img} className="object-cover w-full" alt=""/>
             
             {/* buttons */}
             {session && (
                 
                 <div className="flex justify-between px-4 pt-4">

             <div className="flex space-x-4">
                 {hasLiked ? (
                   <HeartIconFilled onClick={likePost} className="btn" />  
                 ):(
                     
                 <HeartIcon onClick={likePost} className="btn" />
                 )}
                 <ChatIcon className="btn" />
                 <PaperAirplaneIcon className="btn"/>
             </div>
             <BookmarkIcon className="btn"/>
             </div>
                 )}
             {/* caption */}
             <p className="p-5 truncate">
                 {likes.length>0 && (
                     <p className="mb-1 font-bold">{likes.length} likes</p>
                 )}
                 <span className="mr-1 font-bold">{username}</span>
                 {caption}
                 
             </p>
             {/* comments */}
             {comments.length>0 && (
                 <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                     {comments.map(comment=>(
                         <div key={comment.id} className="flex items-center mb-3 space-x-2">
                             <img className="rounded-full h-7" src={comment.data().userImg} alt=""/>
                             <p className="flex-1 text-sm">
                                 <span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>
                                 <Moment className="pr-5 text-xs" fromNow>
                                     {comment.data().timestamp?.toDate()}
                                 </Moment>
                         </div>
                     ))}
                 </div>
             )}
             {/* inputbox */}
             {session && (

                 <form className="flex items-center p-4">
                 <EmojiHappyIcon className="h-7"/>
                 <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment..." className="flex-1 border-none outline-none focus:ring-0" type="text"/>
                 <button type="submit" disabled={!comment.trim()} onClick={sendComment} className="font-semibold text-blue-500">Post</button>
             </form>
                 )}

        </div>
    )
}

export default Post
