import { CiFolderOn, CiLocationOn } from 'react-icons/ci';
import { GiNewspaper, GiStethoscope } from 'react-icons/gi';
import { GoPlus } from 'react-icons/go';
import { GrMapLocation } from 'react-icons/gr';
import { IoPeopleOutline } from 'react-icons/io5';
import { LiaCanadianMapleLeaf, LiaClipboardListSolid } from 'react-icons/lia';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { PiNewspaperThin } from 'react-icons/pi';
import { RiDashboardFill } from 'react-icons/ri';

export const navLink = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: RiDashboardFill,
  },
  {
    name: "Booking List",
    href: "/dashboard/booking-list",
    icon: LiaClipboardListSolid,
  },
  {
    name: "Service",
    href: "/dashboard/service",
    icon: LiaCanadianMapleLeaf,
    subItems: [
      { name: "Add Service", href: "/dashboard/add-service", icon: GoPlus },
      {
        name: "All Services",
        href: "/dashboard/all-service",
        icon: CiFolderOn,
      },
    ],
  },
  {
    name: "Locations",
    href: "/dashboard/locations",
    icon: CiLocationOn,
    subItems: [
      {
        name: "Add Location",
        href: "/dashboard/add-location",
        icon: MdOutlineAddLocationAlt,
      },
      {
        name: "All Location",
        href: "/dashboard/all-location",
        icon: GrMapLocation,
      },
    ],
  },
  {
    name: "Our clinicians",
    href: "/dashboard/clinicians",
    icon: GiStethoscope,
    subItems: [
      {
        name: "Add Clinician",
        href: "/dashboard/add-clinicians",
        icon: GoPlus,
      },
      {
        name: "All Clinician",
        href: "/dashboard/all-clinicians",
        icon: IoPeopleOutline,
      },
    ],
  },
  {
    name: "Blog",
    href: "/dashboard/blog",
    icon: PiNewspaperThin,
    subItems: [
      { name: "Add Blogs", href: "/dashboard/blog/post1", icon: GoPlus },
      { name: "All Blogs", href: "/dashboard/blog/post2", icon: GiNewspaper },
    ],
  },
];
