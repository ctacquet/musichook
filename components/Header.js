import Image from "next/image";
import {
    SearchIcon,
    ArrowLeftIcon,
    MenuIcon
} from "@heroicons/react/outline"
import {
    HomeIcon
} from "@heroicons/react/solid"

function Header() {
    return (
        <div className="sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
                {/* Left - Logo */}
                <div className='relative hidden lg:inline-grid w-8 cursor-pointer align-middle'>
                    <div>
                        <Image 
                            src="/icon.png"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className="pl-10 text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                        <p className="font-Poppins font-bold text-2xl">MusicHook</p>
                    </div>
                </div>
                <div className='relative w-8 lg:hidden flex-shrink-0 cursor-pointer align-middle'>
                    <Image 
                        src="/icon.png"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                {/* Middle - Page title */}
                <div className="flex items-center justify-end space-x-2 pl-48 pr-48 shadow-sm border bg-white">
                    <HomeIcon className="h-4 w-4" />
                    <p className="font-Poppins">Home</p>
                </div>
                
                {/* Right - Search bar */}
                <div className="max-w-xs">
                    <div className="relative mt-1 p-3 rounded-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input 
                            className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md font-Poppins" 
                            type="text" 
                            placeholder="Search" 
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header
