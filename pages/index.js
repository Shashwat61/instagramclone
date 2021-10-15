import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'
export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50">
     <Head>
       <title>Instagram</title>
       <link rel="icon" href="/favicon.ico"/>
     </Head>
     {/* header */}
     <Header/>
     {/* feed */}
     <Feed/>

     {/* modal */}
      <Modal/>
    </div>
  )
}
