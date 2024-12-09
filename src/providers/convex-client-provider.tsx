"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";

import { AuthLoading, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { Loading } from "@/components/loading";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

type Props = {
    children: React.ReactNode;
};

export const ConvexClientProvider = ({ children }: Props) => {
    return (
        <ClerkProvider afterSignOutUrl="/sign-in">
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
