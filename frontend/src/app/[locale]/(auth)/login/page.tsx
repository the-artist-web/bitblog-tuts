/**
 * Node modules
 */
import type { Metadata } from "next";

/**
 * Assets
 */
import { loginBanner } from "@/assets/images";

/**
 * Constants
 */
import { SITE_SETTING } from "@/constants";

/**
 * Components
 */
import LoginForm from "@/components/LoginForm";

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
    const pathname = `/${locale}/login`;
    const siteName = SITE_SETTING.siteName;
    const title = `Login | ${siteName}`;
    const description = "Login to your BitBlog account";

    return {
        metadataBase,
        alternates: {
            canonical: pathname
        },
        title: "Login",
        description,
        openGraph: {
            title,
            description,
            url: pathname,
            images: [
                {
                    url: loginBanner.src,
                    width: 400,
                    height: 400,
                }
            ]
        },
        twitter: {
            title,
            description,
            images: {
                url: loginBanner.src,
                alt: title,
            },
        }
    }
};

const page = () => <LoginForm />;

export default page