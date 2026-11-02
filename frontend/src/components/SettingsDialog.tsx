"use client";

/**
 * Node modules
 */
import { useCallback, useEffect } from "react";
import { useFetcher } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

/**
 * Custom modules
 */
import { cn } from "cn";

/**
 * Hooks
 */
import { useUser } from "@/hooks/useUser";

/**
 * Components
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/InputPassword";

/**
 * Assets
 */
import { AtSignIcon, Loader2Icon, MailIcon } from "lucide-react";

/**
 * Types
 */
import type { DialogProps } from "@radix-ui/react-dialog";
import type { ActionResponse } from "@/types";

/**
 * Profile form schema
 */
const profileFormSchema = z.object({
    firstName: z
        .string()
        .max(20, "First Name Must be less than 20 characters")
        .optional(),

    lastName: z
        .string()
        .max(20, "Last Name Must be less than 20 characters")
        .optional(),

    email: z
        .string()
        .max(50, "Email must be less than 50 characters")
        .email("Invalid email address"),

    username: z
        .string()
        .max(20, "Username must be less than 20 characters")
});

const ProfileSettingsForm = () => {
    const fetcher = useFetcher();
    const user = useUser();
    const data = fetcher.data as ActionResponse;

    const loading = fetcher.state !== "idle";
    
    useEffect(() => {
        if (data && data.ok) toast.success("Profile has been updated successfully");
    }, [data]);

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: user?.email,
        username: user?.username
    }

    // React hook form initial
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues
    });

    // Handle form submission
    const onSubmit = useCallback(async (values: z.infer<typeof profileFormSchema>) => {
        await fetcher.submit(values, {
            action: "/settings",
            method: "POST",
            encType: "application/json"
        });
    }, []);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            {...form}
        >
            <div>
                <h3 className="font-semibold text-lg">Personal info</h3>

                <p className="text-sm text-muted-foreground">Update your photo and personal details here.</p>

                <FieldSeparator className="my-5" />
            </div>

            <div className="grid gap-4 items-start lg:grid-cols-[1fr_2fr]">
                <div className={cn("text-sm leading-none font-medium", (form.formState.errors.firstName || form.formState.errors.lastName) && "text-destructive")}>Name</div>

                <div className="grid max-md:gap-y-4 gap-x-6 md:grid-cols-2">
                    <Controller
                        control={form.control}
                        name="firstName"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel
                                    htmlFor="first_name"
                                    className="md:sr-only"
                                >First name</FieldLabel>

                                <Input
                                    type="text"
                                    placeholder="John"
                                    id="first_name"
                                    {...field}
                                />
                                        
                                {fieldState.error && <FieldError>{fieldState.error?.message}</FieldError>}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="lastName"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel
                                    htmlFor="last_name"
                                    className="md:sr-only"
                                >Last name</FieldLabel>

                                <Input
                                    type="text"
                                    placeholder="Doe"
                                    id="last_name"
                                    {...field}
                                />
                                        
                                {fieldState.error && <FieldError>{fieldState.error?.message}</FieldError>}
                            </Field>
                        )}
                    />
                </div>
            </div>

            <FieldSeparator className="my-5" />

            <Controller
                control={form.control}
                name="email"
                defaultValue={user?.email}
                render={({ field, fieldState }) => (
                    <Field className="!grid !gap-4 !items-start lg:!grid-cols-[1fr_2fr]">
                        <FieldLabel htmlFor="email_address">Email Address</FieldLabel>

                        <div className="space-y-2">
                            <div className="relative">
                                <MailIcon 
                                    size={20}
                                    className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-muted-foreground"
                                />

                                <Input
                                    type="email"
                                    placeholder="John@example.com"
                                    id="email_address"
                                    className="ps-10"
                                    {...field}
                                />
                            </div>
                        </div>
                                
                        {fieldState.error && <FieldError>{fieldState.error?.message}</FieldError>}
                    </Field>
                )}
            />

            <FieldSeparator className="my-5" />

            <Controller
                control={form.control}
                name="username"
                defaultValue={user?.username}
                render={({ field, fieldState }) => (
                    <Field className="grid gap-4 items-start lg:grid-cols-[1fr_2fr]">
                        <FieldLabel htmlFor="username">Username</FieldLabel>

                        <div className="space-y-2">
                            <div className="relative">
                                <AtSignIcon 
                                    size={20}
                                    className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-muted-foreground"
                                />

                                <Input
                                    type="text"
                                    placeholder="Johndoe"
                                    id="username"
                                    className="ps-10"
                                    {...field}
                                />
                            </div>
                        </div>
                                
                        {fieldState.error && <FieldError>{fieldState.error?.message}</FieldError>}
                    </Field>
                )}
            />

            <FieldSeparator className="my-5" />

            <div className="flex justify-start gap-3">
                <DialogClose asChild>
                    <Button
                        type="button"
                        variant="outline"
                    >Cancel</Button>
                </DialogClose>

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading && <Loader2Icon className="animate-spin" />}

                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    )
}

/**
 * Password form schema
 */
const passwordFormSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),

    confirm_password: z
        .string()
}).refine(data => data.password === data.confirm_password, {
    message: "Passwords doesn't match",
    path: ["confirm_password"]
});

const PasswordSettingsForm = () => {
    const fetcher = useFetcher();
    const data = fetcher.data as ActionResponse;

    const loading = fetcher.state !== "idle";

    useEffect(() => {
        if (data && data.ok) toast.success("Password has been updated successfully");
    }, [data]);

    // React hook form initial
    const form = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            password: "",
            confirm_password: ""
        }
    });

    // Handle form submission
    const onSubmit = useCallback(async (values: z.infer<typeof passwordFormSchema>) => {
        await fetcher.submit(values, {
            action: "/settings",
            method: "POST",
            encType: "application/json"
        })
    }, []);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            {...form}
        >
            <div>
                <h3 className="font-semibold text-lg">Password</h3>

                <p className="text-sm text-muted-foreground">Please enter your current password to change your password.</p>

                <FieldSeparator className="my-5" />
            </div>

            <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                    <Field className="grid gap-4 items-start lg:grid-cols-[1fr_2fr]">
                        <FieldLabel htmlFor="new_password">New password</FieldLabel>

                        <InputPassword
                            placeholder="••••••••••••"
                            id="new_password"
                            {...field}
                        />
                                
                        {fieldState.error && <FieldError>{fieldState.error?.message}</FieldError>}
                    </Field>
                )}
            />

            <FieldSeparator className="my-5" />

            <Controller
                control={form.control}
                name="confirm_password"
                render={({ field, fieldState }) => (
                    <Field className="grid gap-4 items-start lg:grid-cols-[1fr_2fr]">
                        <FieldLabel htmlFor="confirm_new_password">Confirm new password</FieldLabel>

                        <InputPassword
                            placeholder="••••••••••••"
                            id="confirm_new_password"
                            {...field}
                        />
                                
                        {fieldState.error && <FieldError>{fieldState.error?.message}</FieldError>}
                    </Field>
                )}
            />

            <FieldSeparator className="my-5" />

            <div className="flex justify-start gap-3">
                <DialogClose asChild>
                    <Button
                        type="button"
                        variant="outline"
                    >Cancel</Button>
                </DialogClose>

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading && <Loader2Icon className="animate-spin" />}

                    {loading ? "Updating..." : "Update password"}
                </Button>
            </div>
        </form>
    )
}

const SettingsDialog = ({
    children,
    ...props
}: React.PropsWithChildren<DialogProps>) => {
    return (
        <Dialog {...props}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="md:min-w-[80vm] xl:min-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Settings</DialogTitle>
                </DialogHeader>

                <Tabs 
                    defaultValue="profile"
                    className="grid gap-5"
                >
                    <TabsList className="w-full">
                        <TabsTrigger 
                            className="data-[state=active]:bg-popover data-[state=active]:!text-foreground data-[state=active]:border-2 data-[state=active]:border-border"
                            value="profile"
                        >Profile</TabsTrigger>

                        <TabsTrigger 
                            className="data-[state=active]:bg-popover data-[state=active]:!text-foreground data-[state=active]:border-2 data-[state=active]:border-border"
                            value="password"
                        >Password</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <ProfileSettingsForm />
                    </TabsContent>

                    <TabsContent value="password">
                        <PasswordSettingsForm />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsDialog