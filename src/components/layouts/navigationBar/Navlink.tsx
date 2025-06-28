import { useState } from "react"; // Import useState for managing dropdown state
import { FiSidebar } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom"; // Use react-router-dom instead of react-router
import type { NavLink } from "../types";

interface MainNavLinkProps {
  navLink: NavLink[];
  additionalRoutes: NavLink[] | null;
  setIsShort: React.Dispatch<React.SetStateAction<boolean>>;
  isShort: boolean;
  dark?: boolean;
}

export default function MainNavLink({
  navLink,
  additionalRoutes,
  setIsShort,
  isShort,
  dark = false,
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
  const renderNavLink = (
    link: NavLink,
    isShort: boolean,
    setIsShort: React.Dispatch<React.SetStateAction<boolean>>,
    dark?: boolean
  ) => {
    const hasSubItems = link.subItems && link.subItems.length > 0;

    return (
      <div key={link.name}>
        {/* Dropdown Trigger */}
        <div
          className={`flex items-center justify-between gap-3 px-3 py-3 rounded-md cursor-pointer ${
            isActive(link.href)
              ? dark
                ? "bg-primary text-white"
                : "bg-primary text-white"
              : dark
              ? "text-white hover:bg-primary/40"
              : "hover:bg-primary/10 hover:text-primary"
          }`}
          onClick={() => hasSubItems && toggleDropdown(link.name)}
          onMouseEnter={() => setIsShort(true)}
        >
          {hasSubItems ? (
            <button className="flex items-center gap-3 flex-1 overflow-hidden">
              <div className="rounded">
                {link.icon && <link.icon className="min-w-6 min-h-6" />}
              </div>
              {isShort && <span className="text-nowrap">{link.name}</span>}
            </button>
          ) : (
            <Link
              to={link.href}
              className="flex items-center gap-3 flex-1 overflow-hidden"
            >
              <div className="rounded">
                {link.icon && <link.icon className="min-w-6 min-h-6" />}
              </div>
              {isShort && <span className="text-nowrap">{link.name}</span>}
            </Link>
          )}

          {hasSubItems && isShort && (
            <span className="text-sm">
              {/* Fixed arrow direction */}
              {openDropdown === link.name ? <FiSidebar /> : <FiSidebar />}
            </span>
          )}
        </div>

        {/* Dropdown Content */}
        {hasSubItems && link.subItems && isShort && (
          <div
            className={`pl-6 transition-all duration-300 ease-in-out overflow-hidden ${
              openDropdown === link.name ? "max-h-96" : "max-h-0"
            }`}
          >
            {link.subItems.map((subItem) => (
              <Link
                key={subItem.name}
                to={subItem.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md overflow-hidden ${
                  isActive(subItem.href)
                    ? dark
                      ? "bg-primary text-white"
                      : "bg-primary text-white"
                    : dark
                    ? "text-white hover:bg-primary/40"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {subItem.icon && (
                  <div className="rounded">
                    <subItem.icon className="min-w-6 min-h-6" />
                  </div>
                )}
                {isShort && (
                  <span className="text-nowrap"> {subItem.name}</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col min-h-screen  relative ${
        dark ? "bg-[#0F2B6C]" : "bg-white"
      }`}
    >
      <div className="lg:block absolute top-16 right-0 hidden z-50">
        <button
          className={`rounded-md  transition-colors w-fit shadow-md px-3 z-50 ${
            dark ? "text-white" : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => setIsShort(!isShort)}
          aria-label="Toggle menu"
        >
          {isShort ? (
            <FiSidebar
              className={`h-6 w-6  z-50 ${
                dark ? "hover:text-white" : "hover:text-primary"
              }`}
            />
          ) : (
            <FiSidebar
              className={`h-6 w-6  z-50 rotate-180 ${
                dark ? "hover:text-white" : "hover:text-primary"
              }`}
            />
          )}
        </button>
      </div>

      {/* Logo Section */}
      <div className="flex items-center gap-3 px-3 py-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
            <path
              fill={dark ? "white" : "#b0b0b0"}
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"
            />
          </g>
        </svg>
        {/* <Image
                        src={user?.image || "https://cdn-icons-png.freepik.com/256/18751/18751478.png?semt=ais_hybrid"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    /> */}
        {isShort && (
          <div className="flex-1">
            <div
              className={`font-medium ${dark ? "text-white" : "text-gray-500"}`}
            >
              {"John Doe"}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 mt-2">
        <div className="space-y-1">
          {navLink.map((link) =>
            renderNavLink(link, isShort, setIsShort, dark)
          )}
        </div>
      </nav>

      {/* Additional Routes and User Section */}
      <div className="mt-auto p-4 space-y-1">
        {additionalRoutes?.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-md ${
              isActive(link.href)
                ? dark
                  ? ""
                  : "bg-primary text-white"
                : dark
                ? ""
                : "bg-primary text-white"
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
          className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer ${
            dark ? "hover:bg-primary/40" : "hover:bg-primary/10"
          }`}
        >
          <IoLogOut
            className={`min-w-6 min-h-6 ${dark ? "text-white" : "text-black"}`}
          />
          {isShort && (
            <span
              className={`text-nowrap ${dark ? "text-white" : "text-black"}`}
            >
              Log Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
