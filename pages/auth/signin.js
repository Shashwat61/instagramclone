import { getProviders, signIn } from "next-auth/client"
import Header from "../../components/Header"

export default function SignIn({providers}) {
  
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 text-center px-14">
      <img className="object-contain mt-40 w-80" src="https://links.papareact.com/ocw" alt=""/>
      <p className="italic font-xs"></p>
    <div className="mt-40">

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="p-3 text-white bg-blue-500 rounded-lg" onClick={() => signIn(provider.id,{callbackUrl:'http://localhost:3000/'})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div>
      
    </div>
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
}
// SignIn.getInitialProps = async () => {
//     return {
//       providers: await getProviders()
//     }
//   }

