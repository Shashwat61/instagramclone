import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"
import { signOut, useSession } from "next-auth/client"

function Feed() {
  const [session]=useSession()
  
    return (
        <main className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl ${!session && "!grid-cols-1 !max-w-3xl"}`} >
          {/* section */}
            <section className="col-span-2">
          {/* stories */}
           <Stories/>
           <Posts/>
          {/* posts */}
            </section>
           {session && 
           <section className="hidden lg:inline-grid md:col-span-1">
          {/* section */}
          {/* miniprofile */}
          <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
          </div>
          {/* suggestions */}
           </section>
          }
        </main>
    )
}

export default Feed
