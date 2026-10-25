"use client";

/**
 * Node modules
 */
import { useState } from "react";

/**
 * Components
 */
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import {
    InputGroup,
    InputGroupInput
} from "@/components/ui/input-group";
import { IconBtn } from "@/components/ui/icon-button";

/**
 * Assets
 */
import {
    EyeIcon,
    EyeClosedIcon
} from "lucide-react";

const InputPassword = ({
    ...props
}: React.ComponentProps<"input">) => {
    const [togglePassword, setTogglePassword] = useState(false);

    return (
        <InputGroup>
            <InputGroupInput
                type={togglePassword ? "text" : "password"}
                {...props}
            />

            <Tooltip>
                <TooltipTrigger asChild>
                    <IconBtn
                        type="button"
                        variant="text"
                        size="xs"
                        onClick={() => setTogglePassword(togglePassword ? false : true)}
                    >
                        {!togglePassword ? <EyeIcon /> : <EyeClosedIcon />}

                        <div className="state-layer" />
                    </IconBtn>
                </TooltipTrigger>

                <TooltipContent
                    side="bottom"
                    align="center"
                >{togglePassword ? "Hide Password" : "Show Password"}</TooltipContent>
            </Tooltip>
        </InputGroup>
    )
}

export default InputPassword