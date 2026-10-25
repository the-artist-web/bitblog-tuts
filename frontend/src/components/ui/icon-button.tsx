import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const iconButtonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-3 text-nowrap rounded-md cursor-pointer border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        field: "bg-primary text-primary-foreground [--state-layer-bg:var(--primary-foreground)]",
        text: "text-muted-foreground hover:text-foreground [--state-layer-bg:var(--foreground)]",
      },
      size: {
        xs: "min-w-extra-small max-w-extra-small min-h-extra-small max-h-extra-small [&_svg]:!size-[calc(var(--spacing-extra-small)/2)]",
        sm: "min-w-small max-w-small min-h-small max-h-small [&_svg]:!size-[calc(var(--spacing-small)/2)]"
      },
    },
    defaultVariants: {
      variant: "field",
      size: "sm",
    },
  }
)

function IconBtn({
  className,
  variant = "field",
  size = "sm",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { IconBtn, iconButtonVariants }
