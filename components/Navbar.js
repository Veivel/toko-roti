import { toggleNewModal } from "./store";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const bg = "bg-zinc-900";
    const logoSrc = "/icons/storefront-white.svg";

    return (
        <nav className={`${bg} border-gray-900 px-2 py-2.5 min-h-50 rounded dark:bg-gray-900`}>
            <div className="container flex flex-wrap justify-between items-center mx-auto">

                <Link href="/" className="flex items-center">
                    <Image src={logoSrc} width={30} height={30} className="mr-3 h-9" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">tokoroti</span>
                </Link>

                <div className="w-full block w-auto" id="navbar-default">
                    <ul className={`flex p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:${bg} dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}>
                        <button type="button" className="flex mr-3 text-sm text-black md:mr-0 focus:ring-4 focus:ring-gray-300" onClick={toggleNewModal}>
                            + New
                        </button>                        
                        <button type="button" className="flex mr-3 text-sm text-black md:mr-0 focus:ring-4 focus:ring-gray-300">
                            <Link href="/logout/"> Logout</Link>
                        </button>
                    </ul>                        
                </div>
                
                
            </div>
        </nav>
    );
}

export default Navbar