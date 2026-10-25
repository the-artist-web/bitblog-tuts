"use client";

/**
 * Node modules
 */
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

/**
 * Components
 */
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import InputPassword from "@/components/InputPassword";

/**
 * Assets
 */
import { loginBanner } from "@/assets/images";
import Link from "next/link";

/**
 * Constants
 */
const LOGIN_FORM = {
    title: "Welcome back",
    descroption: "Login to your BitBlog account",
    footerText: "Don't have an account?"
}

/**
 * Schema signup form
 */
const signupSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Please enter a valid email address")
        .max(50, "Email must not exceed 50 characters"),

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(30, "Password must not exceed 30 characters")
});

const LoginForm = () => {
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async () => {
        // ...
    }

    return (
        <>
            <FieldSet className="gap-8 p-6 md:p-8">
                <div className="flex flex-col gap-1 text-center">
                    <h1 className="text-2xl font-bold">{LOGIN_FORM.title}</h1>

                    <p className="text-sm font-medium text-muted-foreground">{LOGIN_FORM.descroption}</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-5">
                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email_address">Email address</FieldLabel>

                                    <Input
                                        placeholder="John@example.com"
                                        id="email_address"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        {...field}
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        
                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                    <InputPassword
                                        placeholder="Enter your password"
                                        id="password"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        {...field}
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Button
                            type="submit"
                            size="xs"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Spinner />}

                            <p className="text-sm font-medium">Login</p>

                            <div className="state-layer" />
                        </Button>

                        <p className="text-sm font-medium text-center">
                            {LOGIN_FORM.footerText}{" "}

                            <Link href="/signup" className="underline underline-offset-4 hover:text-primary active:opacity-75 transition-opacity duration-150">Sign up</Link>
                        </p>
                    </FieldGroup>
                </form>
            </FieldSet>

            <Image
                src={loginBanner.src}
                alt="Sign up banner"
                width={400}
                height={400}
                className="w-full h-full object-cover hidden rounded-xl md:block"
            />
        </>
    )
}

export default LoginForm