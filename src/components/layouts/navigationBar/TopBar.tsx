import type { Dispatch, SetStateAction } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import type { User } from "../types";

export default function TopBar({
    isOpen,
    setIsOpen,
    user,
    dark = false
}: {
    user: null | User;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    dark?: boolean
}) {
    return (
        <header className={`  shadow-md ${dark ? "bg-black " : "bg-white"}`}>


            <div className="flex items-center justify-between px-4 py-3">
                {/* Left Section: Toggle Button (Mobile) */}
                <button
                    className={`lg:hidden p-2 rounded-md  transition-colors ${dark ? "bg-black " : "hover:bg-gray-100"}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <LuX className={`h-6 w-6  ${dark ? "text-white" : "text-gray-700"}`} />
                    ) : (
                        <LuMenu className={`h-6 w-6  ${dark ? "text-white " : "text-gray-700"}`} />
                    )}
                </button>

                {/* Left Section: Welcome Message (Desktop) */}
                <div className="items-center gap-2 ">
                    <span className={` text-sm font-medium ${dark ? "text-white " : "text-gray-700"}`}>
                        Welcome Back, {user?.name || "John Doe"}!
                    </span>
                    <span className="text-xl">👋</span>
                </div>

                {/* Right Section: User Actions */}
                {/* User Profile Section */}
                <div className="flex items-center gap-3 px-3 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" /><path fill={dark ? "white" : "#b0b0b0"} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" /></g></svg>
                    {/* <Image
                        src={user?.image || "https://cdn-icons-png.freepik.com/256/18751/18751478.png?semt=ais_hybrid"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    /> */}
                    <div className="flex-1">
                        <div className={`font-medium ${dark ? "text-white" : "text-gray-500"}`}>{user?.name || "John Doe"}</div>
                        <div className={`text-xs  ${dark ? "text-white" : "text-gray-500"}`}>{user?.role || "Super Admin"}</div>
                    </div>
                </div>
            </div>
        </header>
    );
}