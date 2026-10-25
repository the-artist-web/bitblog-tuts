import { Card } from "@/components/ui/card";
import Link from "next/link";

const layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center justify-center w-full min-h-dvh py-10 px-4">
            <div className="flex flex-col gap-6 w-full max-w-3xl">
                <Card className="grid p-0 gap-0 md:grid-cols-2">
                    {children}
                </Card>

                <p className="text-muted-foreground text-xs font-medium text-center">
                    By clicking continue, you agree to our{" "}
                    <Link href="#" className="underline underline-offset-4 hover:text-primary active:opacity-75 transition-all duration-150">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="#" className="underline underline-offset-4 hover:text-primary active:opacity-75 transition-all duration-150">Privacy Policy</Link>
                </p>
            </div>
        </div>
    )
}

export default layout