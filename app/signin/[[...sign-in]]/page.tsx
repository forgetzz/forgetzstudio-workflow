"use client"

import { SignIn } from "@clerk/nextjs"
import { cn } from "@/utils"

export default function Page() {
    return (
        <div
            className={cn(
                "min-h-screen",
                "flex justify-center items-center",
            )}
        >
            <SignIn
                forceRedirectUrl="/home"
                signUpUrl="/signup"
            />
        </div>
    )
}