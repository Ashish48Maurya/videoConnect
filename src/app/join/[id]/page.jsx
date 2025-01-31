"use client";
import React, { use, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function Page({ params }) {
    const { user, isLoaded } = useUser();
    const videoContainerRef = useRef(null);
    const resolvedParams = use(params);

    useEffect(() => {
        if (!isLoaded || !user?.id || !videoContainerRef.current) return; 

        const appID = parseInt(process.env.NEXT_PUBLIC_APP_ID, 10);
        const serverSecret = process.env.NEXT_PUBLIC_SERVER_SEC;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            resolvedParams?.id,
            user?.id,
            user?.fullName || "Guest"
        );


        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: videoContainerRef.current,
            sharedLinks: [
                {
                    name: "Meet Link",
                    url: window.location.href,
                },
            ],
        });

    }, [params, user, isLoaded]);

    return <div ref={videoContainerRef} className="flex justify-center items-center h-[100%]"/>;
}