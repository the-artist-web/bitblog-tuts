"use client";

/**
 * Node modules
 */
import { Link } from "react-router";
import { motion } from "motion/react";

/**
 * Components
 */
const MotionLink = motion.create(Link);

/**
 * Assets
 */
import { logoLight, logoDark } from "@/assets";

const Logo = () => {
    return (
        <MotionLink
            to="/"
            className="text-primary text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            viewTransition
        >
            <img
                src={logoLight}
                width={115}
                height={32}
                className="hidden dark:block"
            />

            <img
                src={logoDark}
                width={115}
                height={32}
                className="dark:hidden"
            />
        </MotionLink>
    )
}

export default Logo