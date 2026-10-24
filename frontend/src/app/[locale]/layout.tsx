/**
 * Node modules
 */
import type { Metadata } from "next";
import { ViewTransition } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

/**
 * Custom modules
 */
import { routing } from "@/i18n/routing";

/**
 * Assets
 */
import { favicon } from "@/assets/images";
import "@/assets/css/styles.css";

/**
 * Constants
 */
import { SITE_SETTING } from "@/constants";

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
  const pathname = `/${locale}/`;
  const siteName = SITE_SETTING.siteName;
  const description = SITE_SETTING.siteDescription;

  return {
    metadataBase,
    alternates: {
      canonical: pathname,
      languages: {
        "en": "/en",
        "ar": "/ar"
      }
    },
    icons: {
      icon: favicon.src,
      shortcut: favicon.src,
      apple: favicon.src,
      other: {
        rel: "apple-touch-icon-precomposed",
        url: favicon.src
      }
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    title: {
      template: `%s | ${siteName}`,
      default: siteName
    },
    description,
    referrer: "origin-when-cross-origin",
    openGraph: {
      title: siteName,
      description,
      url: pathname,
      siteName,
      locale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description
    },
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string
  }>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="dark"
    >
      <body>
        <NextIntlClientProvider>
          <NextTopLoader
            color="var(--primary)"
            showSpinner={false}
          />
          <ViewTransition>{children}</ViewTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
