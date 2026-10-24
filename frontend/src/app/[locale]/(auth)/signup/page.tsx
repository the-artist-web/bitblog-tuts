/**
 * Node modules
 */
import type { Metadata } from "next";

/**
 * Assets
 */
import { signupBanner } from "@/assets/images";

/**
 * Constants
 */
import { SITE_SETTING } from "@/constants";

/**
 * Components
 */
import SignupForm from "@/components/SignupForm";

/**
 * Meta tags
 */
export async function generateMetadata({
    params
}: {
    params: Promise<{
        locale: string;
    }>
}): Promise<Metadata> {
    const { locale } = await params;
    const metadataBase = new URL(process.env.NEXT_PUBLIC_DOMIN!);
    const pathname = `/${locale}/signup`;
    const siteName = SITE_SETTING.siteName;
    const title = `Sign up | ${siteName}`;
    const description = "Enter your email below to create an account";

    return {
        metadataBase,
        alternates: {
            canonical: pathname
        },
        title: "Sign up",
        description,
        openGraph: {
            title,
            description,
            url: pathname,
            images: [
                {
                    url: signupBanner.src,
                    width: 400,
                    height: 400,
                }
            ]
        },
        twitter: {
            title,
            description,
            images: {
                url: signupBanner.src,
                alt: title,
            },
        }
    }
};

const page = () => <SignupForm />;

export default page