import Image from "next/image"
import Link from "next/link"


const Navbar = () => {
    return (
        <nav className="fixed w-full h-24 shadow-xl bg-[#36adc6] z-20">
            <div className="flex justify-between items-center h-full w-full px-8 2xl:px-16">
                <Link href="/home">
                    <Image src="/Logo.png" alt="logo" width={90} height={25} className="cursor-pointer" />
                </Link>
                <div>
                    <ul className="hidden sm:flex text-white">
                        <Link href="/market">
                            <li className="ml-10 uppercase hover:border-b hover:text-yellow-400 text-xl">Market</li>
                        </Link>
                        <Link href="/friends">
                            <li className="ml-10 uppercase hover:border-b hover:text-yellow-400 text-xl">Friends</li>
                        </Link>
                        <Link href="/profile">
                            <li className="ml-10 uppercase hover:border-b hover:text-yellow-400 text-xl">Profile</li>
                        </Link>
                        <Link href="/">
                            <li className="ml-10 uppercase hover:border-b hover:text-yellow-400 text-xl">Log out</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar