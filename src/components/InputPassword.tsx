"use client";

/**
 * Node modules
 */
import { useState } from "react";

/**
 * Custom modules
 */
import { cn } from "cn";

/**
 * Components
 */
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";

/**
 * Assets
 */
import { EyeClosedIcon, EyeIcon } from "lucide-react";

/**
 * Types
 */
type InputPasswordProps = Omit<React.ComponentProps<"input">, "type">;

const InputPassword: React.FC<InputPasswordProps> = ({
    className,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter "
                className={cn("pe-12 placeholder:tracking-normal", !showPassword && "tracking-widset", className)}
                {...props}
            />

            <Toggle
                type="button"
                pressed={showPassword}
                onPressedChange={setShowPassword}
                className="absolute top-1/2 -translate-y-1/2 right-0.5 rtl:right-auto rtl:left-0.5 size-7.5"
            >
                {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
            </Toggle>
        </div>
    )
}

export default InputPassword