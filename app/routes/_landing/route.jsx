import { Outlet } from "@remix-run/react";

export default function LandingWrapper() {
    return (
        <div className="flex flex-col w-full min-h-screen font-inter text-landing-primary bg-landing-wrapper overflow-x-visible">
            <Outlet />
        </div>
    )
}
