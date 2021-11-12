import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Image from "next/image";
import Head from 'next/head';
import Header from "../../components/Header";

// Browser...
function signIn({ providers }) {
    return (
        <>
            <Head>
                <title>MusicHook</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header pageTitle="Login"/>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
                <div className="flex">
                    <div className="">
                        <Image 
                            src="/icon.png"
                            objectFit="contain"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="pl-4 text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                        <p className="font-bold text-2xl">MusicHook</p>
                    </div>
                </div>
                
                <p className="text-sm">Here you can connect to your account</p>

                <div className="mt-40">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button 
                                className="p-3 bg-blue-500 rounded-lg text-white" 
                                onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

// Server side render
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signIn;
