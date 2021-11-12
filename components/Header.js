import Image from "next/image";
import {
    SearchIcon,
    ArrowLeftIcon,
    MenuIcon,
    LoginIcon
} from "@heroicons/react/outline";
import {
    HomeIcon
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

function Header({ pageTitle }) {
    const router = useRouter();
    var icon;
    
    switch (pageTitle) {
        case "Home": {
            icon = <HomeIcon className="h-4 w-4" />;
        }
        case "Login": {
            icon = <LoginIcon className="h-4 w-4" />;
        }
        default: {
            icon = <ArrowLeftIcon className="h-4 w-4" />;
        }
    }


    return (
        <div className="sticky top-0 z-5">
            <main className="grid grid-cols-1 md:grid-cols-6 md:max-w-6xl xl:grid-cols-6 xl:max-w-12xl mx-auto">
                {/* Left - Logo */}
                <div className="col-span-1 flex">
                    <div onClick={() => router.push("/")} className='relative hidden lg:inline-grid w-8 cursor-pointer'>
                        <div>
                            <Image 
                                src="/icon.png"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <div className="pl-10 text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                            <p className="font-bold text-2xl">MusicHook</p>
                        </div>
                    </div>
                    <div onClick={() => router.push("/")} className='relative w-8 lg:hidden flex-shrink-0 cursor-pointer'>
                        <Image 
                            src="/icon.png"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>

                {/* Middle - Page title */}
                <div className="flex flex-wrap items-center justify-center space-x-2 col-span-4 border bg-white shadow-sm">
                    {icon}
                    <p>{pageTitle}</p>
                </div>
                
                {/* Right - Search bar */}
                <div className="col-span-1">
                    <div className="relative mt-1 p-3 rounded-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input 
                            className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" 
                            type="text" 
                            placeholder="Search" 
                        />
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Header;
