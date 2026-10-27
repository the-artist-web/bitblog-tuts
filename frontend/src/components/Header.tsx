"use client";

/**
 * Node modules
 */
import { Link } from "react-router";
import { useState } from "react";

/**
 * Custom modules
 */
import { cn } from "cn";

/**
 * Custom hooks
 */
import { useUser } from "@/hooks/useUser";

/**
 * Components
 */
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

/**
 * Assets
 */
import {
    MenuIcon,
    XIcon
} from "lucide-react";

const Header = ({
    className,
    ...props
}: React.ComponentProps<"header">) => {
    const user = useUser();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header
            className={cn("border-b fixed top-0 left-0 w-full h-16 grid items-center bg-background z-40", className)}
            {...props}
        >
            <div className="container py-3 flex items-center gap-4">
                <Logo />

                <div className={cn("grow max-md:absolute max-md:top-16 max-md:left-0 max-md:bg-background max-md:w-full max-md:border-b md:flex md:justify-between", !mobileMenuOpen && "max-md:hidden")}>
                    <Navbar className="max-md:p-3 md:ms-4" />

                    {!user && (
                        <div className="flex flex-col-reverse gap-y-3 gap-x-2 md:flex-row md:items-center max-md:p-3 border-t-1 md:border-t-transparent">
                            <Button
                                variant="outline"
                                asChild
                            >
                                <Link
                                    to="/login"
                                    viewTransition
                                >Login</Link>
                            </Button>

                            <Button asChild>
                                <Link
                                    to="/signup"
                                    viewTransition
                                >Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1.5 ms-auto">
                    <ThemeToggle />

                    <UserMenu />

                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(mobileMenuOpen ? false : true)}
                    >{mobileMenuOpen ? <XIcon /> : <MenuIcon />}</Button>
                </div>
            </div>
        </header>
    )
}

export default Header