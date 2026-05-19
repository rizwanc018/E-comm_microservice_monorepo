"use client";

import { useAuth } from "@clerk/nextjs";

const Page = () => {
    const { signOut } = useAuth();
    return (
        <div className="mt-24 flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl">You do not have an access!</h1>
            <button className="px-6 py-2 bg-black text-white rounded-md" onClick={() => signOut()}>
                Sign out
            </button>
        </div>
    );
};

export default Page;
