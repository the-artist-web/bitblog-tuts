"use client";

/**
 * Node modules
 */
import { Link, useFetcher, useNavigate } from "react-router";
import { z } from "zod";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import InputPassword from "@/components/InputPassword";

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
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const loginResponse = fetcher.data as ActionResponse<AuthResponse>;

    const isLoading = fetcher.state !== "idle";

    // React hook form initial
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Handle form submission
    const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        console.log("....");
    }, []);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form 
                            className="p-6 md:p-8"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center gap-0.5 text-center">
                                    <h1 className="text-2xl font-semibold">{LOGIN_FORM.title}</h1>

                                    <p className="text-muted-foreground text-balance">{LOGIN_FORM.description}</p>
                                </div>

                                <Controller
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <Field className="grid gap-2">
                                            <FieldLabel htmlFor="email">Email address</FieldLabel>

                                            <Input
                                                placeholder="john@example.com"
                                                id="email"
                                                {...field}
                                            />

                                            <FieldError></FieldError>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <Field className="grid gap-2">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>

                                            <InputPassword
                                                placeholder="Enter your password"
                                                id="password"
                                                {...field}
                                            />
                                            
                                            <FieldError></FieldError>
                                        </Field>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading && <LoaderCircleIcon className="animate-spin" />}

                                    <span>Login</span>
                                </Button>
                            </div>

                            <div className="mt-4 text-center text-sm">
                                {LOGIN_FORM.footerText}

                                {' '}

                                <Link 
                                    to="/signup"
                                    className="underline underline-offset-4 hover:text-primary"
                                    viewTransition
                                >Sign up</Link>
                            </div>
                        </form>
                    </Form>

                    <figure className="bg-muted relative hidden md:block">
                        <img
                            src={loginBanner}
                            alt="Login banner"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </figure>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '} and <a href="#">Privacy Policy</a>.</div>
        </div>
    )
}

export default LoginForm