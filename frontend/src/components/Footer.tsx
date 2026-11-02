"use client";

/**
 * Custom modules
 */
import { cn } from "cn";

/**
 * Components
 */
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

/**
 * Assets
 */
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandYoutube
} from "@tabler/icons-react";

/**
 * Constants
 */
const SOCIAL_LINKS = [
    {
        href: "https://facebook.com",
        Icon: IconBrandFacebook,
        label: "Facebook Page"
    },
    {
        href: "https://facebook.com",
        Icon: IconBrandInstagram,
        label: "Instagram Page"
    },
    {
        href: "https://facebook.com",
        Icon: IconBrandLinkedin,
        label: "Linkedin Page"
    },
    {
        href: "https://facebook.com",
        Icon: IconBrandYoutube,
        label: "Youtube Page"
    }
] as const;

const Footer = ({
    className,
    ...props
}: React.ComponentProps<"footer">) => {
    return (
        <footer 
            className={cn("border-t", className)}
            {...props}
        >
            <div className="container py-8 grid max-md:justify-items-center md:grid-cols-[1fr_3fr_1fr] md:items-center">
                <Logo />

                <p className="text-muted-foreground order-1 max-md:text-center md:order-none md:justify-self-center">&copy; {new Date().getFullYear()} theartistweb. All right reserved.</p>

                <ul className="flex items-center gap-1 max-md:mt-6 max-md:mb-4 md:justify-self-end">
                    {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                        <li key={href}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                    >
                                        <a 
                                            href={href}
                                            target="_blank"
                                            className=""
                                        >
                                            <Icon stroke={2} />
                                        </a>
                                    </Button>
                                </TooltipTrigger>

                                <TooltipContent

                                >{label}</TooltipContent>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}

export default Footer