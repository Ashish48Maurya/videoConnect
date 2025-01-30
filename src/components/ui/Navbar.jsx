"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, CalendarCheck, LogOut } from "lucide-react"
import { useUser, useClerk } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const { user } = useUser()
    const { signOut } = useClerk()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <Video className="h-8 w-8 text-orange-500" />
                            <span className="ml-2 text-2xl font-bold text-black">VideoConnect</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/meetings" className="font-semibold text-md">Meetings</Link>
                        <div className="flex items-center">
                            {user ? (
                                <UserMenu user={user} signOut={signOut} />
                            ) : (
                                <>
                                    <Button variant="ghost" asChild className="mr-2 text-black hover:text-orange-500">
                                        <Link href="/sign-in">Sign In</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="text-orange-500 border-orange-500 hover:bg-orange-50">
                                        <Link href="/sign-up">Sign Up</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <UserMenu user={user} signOut={signOut} />
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

const NavLink = ({ href, children }) => (
    <Link
        href={href}
        className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
        {children}
    </Link>
)

const NavIconButton = ({ icon: Icon }) => (
    <Button variant="ghost" size="icon" className="text-black hover:text-orange-500">
        <Icon className="h-5 w-5" />
    </Button>
)

const UserMenu = ({ user, signOut }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                    <AvatarImage src={user?.imageUrl} alt="User avatar" />
                    <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem className="md:hidden">
                <CalendarCheck className="mr-2 h-4 w-4" />
                <Link href="/meetings" className="font-semibold text-sm">Meetings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>

    </DropdownMenu>
)

export default Navbar

