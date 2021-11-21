/* eslint-disable react/react-in-jsx-scope */
import { Dialog, Transition } from "@headlessui/react"
import { CameraIcon } from "@heroicons/react/outline"
import { Fragment, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import {db,storage} from '../firebase'
import {addDoc, doc, collection, serverTimestamp, updateDoc} from '@firebase/firestore'
import { signIn, signOut, useSession } from "next-auth/client"
import { ref, getDownloadURL, uploadString } from "@firebase/storage"

function Modal() {
    const [session]=useSession()
    const [open,setOpen]=useRecoilState(modalState)
    const filePickerRef=useRef(null)
    const [selectedFile,setSelectedFile]=useState(null)
    const [loading,setLoading]=useState(false)
    const captionRef=useRef(null)

    const uploadPost=async()=>{
        if(loading) return
        setLoading(true)
        // create a post and add to firestore 'posts' collection
        // get the post ID for the newly created post
        // upload the image to firebase storage with the post id
        // get a download url from firebase storage and update the original post with image
        const docRef=await addDoc(collection(db, 'posts'), {
            username:session?.user?.name.split('').join('').toLocaleLowerCase(),
            caption:captionRef.current.value,
            profileImg:session?.user?.image,
            timestamp:serverTimestamp(),
        })
        
        console.log("new doc added with id", docRef.id)
        
        const imageRef=ref(storage,`posts/${docRef.id}/image`)
        
        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            const downloadURL=await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', docRef.id), {
                image:downloadURL,
            })
        })
        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }
    
    const addImagetoPost=(e)=>{
       const reader=new FileReader()
       if(e.target.files[0]){
           reader.readAsDataURL(e.target.files[0])
       }
       reader.onload=(readerEvent)=>{
           setSelectedFile(readerEvent.target.result)
       }
    }
    console.log(selectedFile)
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
            as='div'
            className='fixed inset-0 z-10 overflow-y-auto'
            onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center">
                    <Transition.Child
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    >
                     <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"/>
                    </Transition.Child>
                    {/* this element is to trick the browser into centering the modal content */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                {selectedFile!==null ? (
                                  <img  className="object-contain w-full cursor-pointer" onClick={()=>setSelectedFile(null)} src={selectedFile} alt=""/>  
                                ):(
                                   <div 
                                    onClick={()=>filePickerRef.current.click()} 
                                className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer">
                                    <CameraIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                                </div>
                                    )
                                    }
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                      <Dialog.Title as='h3' className="text-lg font-medium leading-6 text-gray-900">
                                             Upload a Photo  
                                      </Dialog.Title>
                                      <div>
                                          <input 
                                          ref={filePickerRef}
                                          type="file"
                                           hidden
                                          onChange={addImagetoPost}
                                          />
                                      </div>
                                      <div className="mt-2">
                                          <input className="w-full text-center border-none focus:ring-0"
                                          ref={captionRef}
                                        placeholder="Please enter a caption"
                                          />
                                      </div>    
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button onClick={uploadPost}
                                    disabled={!selectedFile} type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">{loading ? "Uploading..." : "Upload Post"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition.Root>
    )
}

export default Modal
