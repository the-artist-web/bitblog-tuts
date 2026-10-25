"use client";

/**
 * Node modules
 */
import Image from "next/image";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

/**
 * Custom modules
 */
import { api } from "@/lib/client";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputPassword from "@/components/InputPassword";

/**
 * Assets
 */
import { signupBanner } from "@/assets/images";
import Link from "next/link";

/**
 * Constants
 */
const SIGNUP_FORM = {
    title: "Create an account",
    descroption: "Enter your email below to create an account",
    footerText: "Already have an account?"
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
        .max(30, "Password must not exceed 30 characters"),

    role: z.enum(["user", "admin"])
});

const SignupForm = () => {
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "user"
        }
    });

    const { isSubmitting } = form.formState;
    const allValues = form.getValues();

    const onSubmit = async () => {
        const res = await api.post("/auth/register", {
            role: allValues.role,
            email: allValues.email,
            password: allValues.password,
        });

        console.log(res);
    }

    return (
        <>
            <FieldSet className="gap-7 p-6 md:p-8">
                <div className="flex flex-col gap-1 text-center">
                    <h1 className="text-2xl font-bold">{SIGNUP_FORM.title}</h1>

                    <p className="text-sm font-medium text-muted-foreground">{SIGNUP_FORM.descroption}</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-5">
                        
                        <Controller
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Register as</FieldLabel>

                                    <RadioGroup
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                        className="grid grid-cols-2 gap-0.5 p-0.5 rounded-lg border border-border"
                                    >
                                        <Label 
                                            htmlFor="role_user"
                                            className="px-4 min-h-extra-small max-h-extra-small grid place-items-center cursor-pointer rounded-md text-muted-foreground hover:text-foreground has-checked:bg-foreground has-checked:text-background transition-all duration-150 [--state-layer-bg:var(--foreground)]"
                                        >
                                            <RadioGroupItem
                                                value="user"
                                                id="role_user"
                                                hidden
                                            />
                                            
                                            User

                                            <div className="state-layer" />
                                        </Label>

                                        <Label 
                                            htmlFor="role_admin"
                                            className="px-4 min-h-extra-small max-h-extra-small grid place-items-center cursor-pointer rounded-md text-muted-foreground hover:text-foreground has-checked:bg-foreground has-checked:text-background transition-all duration-150 [--state-layer-bg:var(--foreground)]"
                                        >
                                            <RadioGroupItem
                                                value="admin"
                                                id="role_admin"
                                                hidden
                                            />

                                            Admin

                                            <div className="state-layer" />
                                        </Label>
                                    </RadioGroup>
                                </Field>
                            )}
                        />
                        
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

                            <p className="text-sm font-medium">Sign up</p>

                            <div className="state-layer" />
                        </Button>

                        <p className="text-sm font-medium text-center">
                            {SIGNUP_FORM.footerText}{" "}

                            <Link href="/login" className="underline underline-offset-4 hover:text-primary active:opacity-75 transition-opacity duration-150">Login</Link>
                        </p>
                    </FieldGroup>
                </form>
            </FieldSet>

            <Image
                src={signupBanner.src}
                alt="Sign up banner"
                width={400}
                height={400}
                className="w-full h-full object-cover hidden rounded-xl md:block"
            />
        </>
    )
}

export default SignupForm