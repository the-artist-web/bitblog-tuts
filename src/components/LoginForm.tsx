"use client";

/**
 * Node modules
 */
import { Link, useFetcher, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolver/zod";
import { useCallback, useEffect } from "react";

/**
 * Custom modules
 */
import { cn } from "@/lib/utils";

/**
 * Components
 */
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

/**
 * Assets
 */
import { loginBanner } from "@/assets";
import { LoaderCircleIcon } from "lucide-react";

/**
 * Types
 */
import type {
    ActionResponse,
    AuthResponse,
    ValidationError
} from "@/types";

type LoginFieldName = "email" | "password";

/**
 * Constants
 */
const LOGIN_FORM = {
    title: "Welcome back",
    description: "Login to your BitBlog account",
    footerText: "Don't have an account?"
} as const;

/**
 * Login form schema
 */
const formSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .max(50, "Email must be less than 50 characters")
        .email("Invalid email address"),

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long"),
});

const LoginForm = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    return (
        <div className={cn(className)} {...props}>
            
        </div>
    )
}

export default LoginForm