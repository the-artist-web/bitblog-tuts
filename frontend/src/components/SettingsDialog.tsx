"use client";

/**
 * Node modules
 */
import { useCallback } from "react";
import { useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * Hooks
 */


/**
 * Components
 */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SettingsDialog = ({
    children,
    ...props
}: React.PropsWithChildren<DialogProps>) => {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent>
                
            </DialogContent>
        </Dialog>
    )
}

export default SettingsDialog