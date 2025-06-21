import { useState } from "react"; // Import useState for managing dropdown state
import { IoLogOut } from "react-icons/io5";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Link, useLocation } from "react-router-dom"; // Use react-router-dom instead of react-router
import type { NavLink } from "../types";

interface MainNavLinkProps {
    navLink: NavLink[];
    additionalRoutes: NavLink[] | null;
    setIsShort: React.Dispatch<React.SetStateAction<boolean>>
    isShort: boolean;
    dark?: boolean
}

export default function MainNavLink({
    navLink,
    additionalRoutes,
    setIsShort,
    isShort,
    dark = false
}: MainNavLinkProps) {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open

    // Check if a link is active
    const isActive = (href: string) => {
        const cleanHref = href.split("?")[0];
        const cleanPathname = location.pathname.split("?")[0];

        // Exact match for dashboard routes
        if (cleanHref === "/dashboard") {
            return cleanPathname === "/dashboard";
        }
        if (cleanHref === "/admin-dashboard") {
            return cleanPathname === "/admin-dashboard";
        }

        // Partial match for other routes
        return cleanPathname.startsWith(cleanHref);
    };

    // Handle logout
    const handleLogout = async () => {
        // Add your logout logic here
        console.log("Logging out...");
    };

    // Toggle dropdown
    const toggleDropdown = (name: string) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    // Render navigation links with dropdown support
    const renderNavLink = (link: NavLink, isShort: boolean, setIsShort: React.Dispatch<React.SetStateAction<boolean>>, dark?: boolean) => {
        const hasSubItems = link.subItems && link.subItems.length > 0;

        return (
            <div key={link.name}>
                {/* Dropdown Trigger */}
                <div
                    className={`flex items-center justify-between gap-3 px-3 py-3 rounded-md cursor-pointer ${isActive(link.href)
                        ? dark ? "bg-primary text-white" : "bg-primary text-white"
                        : dark ? "text-white hover:bg-primary/40" : "hover:bg-primary/10 hover:text-primary"
                        }`}
                    onClick={() => hasSubItems && toggleDropdown(link.name)}
                    onMouseEnter={() => setIsShort(true)}
                >
                    {
                        hasSubItems ? <button
                            className="flex items-center gap-3 flex-1 overflow-hidden"
                        >
                            <div className="rounded">
                                {link.icon && <link.icon className="min-w-6 min-h-6" />}
                            </div>
                            {
                                isShort && <span className="text-nowrap">{link.name}</span>
                            }

                        </button> : <Link
                            to={link.href}
                            className="flex items-center gap-3 flex-1 overflow-hidden"
                        >
                            <div className="rounded">
                                {link.icon && <link.icon className="min-w-6 min-h-6" />}
                            </div>
                            {
                                isShort && <span className="text-nowrap">{link.name}</span>
                            }
                        </Link>
                    }

                    {hasSubItems && isShort && (
                        <span className="text-sm">
                            {/* Fixed arrow direction */}
                            {openDropdown === link.name ? (
                                <MdOutlineKeyboardArrowUp />
                            ) : (
                                <MdOutlineKeyboardArrowDown />
                            )}
                        </span>
                    )}
                </div>

                {/* Dropdown Content */}
                {hasSubItems && link.subItems && isShort && (
                    <div
                        className={`pl-6 transition-all duration-300 ease-in-out overflow-hidden ${openDropdown === link.name ? "max-h-96" : "max-h-0"
                            }`}
                    >
                        {link.subItems.map((subItem) => (
                            <Link
                                key={subItem.name}
                                to={subItem.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md overflow-hidden ${isActive(subItem.href)
                                    ? dark ? "bg-primary text-white" : "bg-primary text-white"
                                    : dark ? "text-white hover:bg-primary/40" : "hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {subItem.icon && (
                                    <div className="rounded">
                                        <subItem.icon className="min-w-6 min-h-6" />
                                    </div>
                                )}
                                {
                                    isShort && <span className="text-nowrap"> {subItem.name}</span>
                                }

                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className={`flex flex-col min-h-screen  relative ${dark ? "bg-black" : "bg-white"}`}>



            <div className="lg:block absolute top-16 right-0 hidden z-50">
                <button
                    className={`rounded-md  transition-colors w-fit shadow-md px-3 z-50 ${dark ? "bg-primary" : "bg-white hover:bg-gray-100"}`}
                    onClick={() => setIsShort(!isShort)}
                    aria-label="Toggle menu"
                >
                    {isShort ? (
                        <LuChevronsRight className={`h-6 w-6  z-50 ${dark ? "hover:text-white" : "hover:text-primary"}`} />
                    ) : (
                        <LuChevronsLeft className={`h-6 w-6  z-50 ${dark ? "hover:text-white" : "hover:text-primary"}`} />
                    )}
                </button>
            </div>


            {/* Logo Section */}
            < Link to="/" className="p-4 min-h-20">
                {
                    isShort && <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="41" viewBox="0 0 180 41" fill="none" className="fill-primary">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3409 28.6363C13.9847 28.6363 12.6841 28.0976 11.725 27.1386C10.766 26.1796 10.2273 24.8789 10.2273 23.5227V0H0V23.5227C0 31.9949 6.86864 38.8636 15.3409 38.8636H26.5909V28.6363H15.3409ZM46.0227 10.2272C44.8139 10.2272 43.617 10.4653 42.5003 10.9279C41.3835 11.3905 40.3689 12.0685 39.5142 12.9232C38.6594 13.7779 37.9814 14.7927 37.5188 15.9094C37.0563 17.0261 36.8182 18.223 36.8182 19.4318C36.8182 20.6405 37.0563 21.8375 37.5188 22.9542C37.9814 24.071 38.6594 25.0857 39.5142 25.9404C40.3689 26.7951 41.3835 27.4732 42.5003 27.9357C43.617 28.3983 44.8139 28.6363 46.0227 28.6363C48.464 28.6363 50.8051 27.6666 52.5313 25.9404C54.2575 24.2142 55.2272 21.873 55.2272 19.4318C55.2272 16.9906 54.2575 14.6494 52.5313 12.9232C50.8051 11.1971 48.464 10.2272 46.0227 10.2272ZM26.5909 19.4318C26.5909 8.70033 35.2912 0 46.0227 0C56.7542 0 65.4545 8.70033 65.4545 19.4318C65.4545 30.1632 56.7542 38.8636 46.0227 38.8636C35.2912 38.8636 26.5909 30.1632 26.5909 19.4318ZM156.477 10.2272C154.036 10.2272 151.695 11.1971 149.969 12.9232C148.242 14.6494 147.273 16.9906 147.273 19.4318C147.273 21.873 148.242 24.2142 149.969 25.9404C151.695 27.6666 154.036 28.6363 156.477 28.6363C158.918 28.6363 161.26 27.6666 162.986 25.9404C164.712 24.2142 165.682 21.873 165.682 19.4318C165.682 16.9906 164.712 14.6494 162.986 12.9232C161.26 11.1971 158.918 10.2272 156.477 10.2272ZM137.045 19.4318C137.045 8.70033 145.746 0 156.477 0C167.209 0 175.909 8.70033 175.909 19.4318C175.909 30.1632 167.209 38.8636 156.477 38.8636C145.746 38.8636 137.045 30.1632 137.045 19.4318ZM86.9318 0C76.2003 0 67.5 8.70033 67.5 19.4318C67.5 30.1632 76.2003 38.8636 86.9318 38.8636H115.568C117.582 38.8636 119.524 38.5568 121.351 37.9881L126.818 40.909L132.717 29.8595C134.216 27.0467 135 23.9086 135 20.7214V19.4318C135 8.70033 126.3 0 115.568 0H86.9318ZM124.773 19.4318C124.773 16.9906 123.803 14.6494 122.077 12.9232C120.35 11.1971 118.009 10.2272 115.568 10.2272H86.9318C85.723 10.2272 84.5261 10.4653 83.4094 10.9279C82.2926 11.3905 81.278 12.0685 80.4233 12.9232C79.5685 13.7779 78.8905 14.7927 78.4279 15.9094C77.9653 17.0261 77.7272 18.223 77.7272 19.4318C77.7272 20.6405 77.9653 21.8375 78.4279 22.9542C78.8905 24.071 79.5685 25.0857 80.4233 25.9404C81.278 26.7951 82.2926 27.4732 83.4094 27.9357C84.5261 28.3983 85.723 28.6363 86.9318 28.6363H115.568C117.997 28.6364 120.328 27.6765 122.051 25.9658C123.776 24.2551 124.754 21.9321 124.773 19.5034V19.4318Z" fill="" />
                            <path d="M179.996 2.55681C179.996 3.23492 179.727 3.88526 179.248 4.36476C178.768 4.84425 178.118 5.11363 177.44 5.11363C176.762 5.11363 176.111 4.84425 175.631 4.36476C175.152 3.88526 174.883 3.23492 174.883 2.55681C174.883 1.8787 175.152 1.22837 175.631 0.748878C176.111 0.269378 176.762 0 177.44 0C178.118 0 178.768 0.269378 179.248 0.748878C179.727 1.22837 179.996 1.8787 179.996 2.55681Z" fill="#FF0000" />
                        </svg>
                        {/* <Image
                        src={"https://cdn-icons-png.freepik.com/256/7653/7653476.png?semt=ais_hybrid"}
                        alt="Booksy.buzz"
                        width={60}
                        height={60}
                        className="rounded max-w-[100px] max-h-[100px]"
                    /> */}
                    </div>
                }

            </Link>


            {/* Navigation Links */}
            <nav className="flex-1 p-4 mt-2">
                <div className="space-y-1">
                    {navLink.map((link) => renderNavLink(link, isShort, setIsShort, dark))}
                </div>
            </nav>

            {/* Additional Routes and User Section */}
            <div className="mt-auto p-4 space-y-1">
                {additionalRoutes?.map((link) => (
                    <Link
                        key={link.name}
                        to={link.href}
                        className={`flex items-center gap-3 px-3 py-3 rounded-md ${isActive(link.href)
                            ? dark ? "" : "bg-primary text-white"
                            : dark ? "" : "bg-primary text-white"
                            }`}
                    >
                        <div className="rounded">
                            {link.icon && <link.icon className="min-w-6 min-h-6" />}
                        </div>
                        {link.name}
                    </Link>

                ))}

                {/* Logout Button */}
                <div
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer ${dark ? "hover:bg-primary/40" : "hover:bg-primary/10"
                        }`}
                >
                    <IoLogOut className={`min-w-6 min-h-6 ${dark ? "text-white" : "text-black"
                        }`} />
                    {
                        isShort && <span className={`text-nowrap ${dark ? "text-white" : "text-black"
                            }`}>Log Out</span>
                    }
                </div>

            </div>
        </div>
    );
}