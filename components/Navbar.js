const Navbar = () => {
    const bg = "bg-zinc-900";
    const logoSrc = "/icons/storefront-white.svg";

    return (
        <nav className={`${bg} border-gray-900 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900`}>
            <div className="container flex flex-wrap justify-between items-center mx-auto">

                <a href="/" className="flex items-center">
                    <img src={logoSrc} className="mr-3 h-6 sm:h-9" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">tokoroti</span>
                </a>

                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className={`flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:${bg} dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}>
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            {/* <img className="w-8 h-8" src="/icons/menu-2-white.svg"></img> */}
                            {/* <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</a> */}
                            <a href="/logout/"> Logout</a>
                        </button>
                    </ul>                        
                </div>
                
                
            </div>
        </nav>
    );
}

export default Navbar