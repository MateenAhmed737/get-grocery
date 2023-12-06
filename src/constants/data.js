import React from "react";
import { BiSolidPackage } from "react-icons/bi";
import {
  BsBuildingsFill,
  BsFillFileEarmarkCheckFill,
  BsPersonBadgeFill,
} from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import {
  FaPersonDigging,
  FaClipboardList,
  FaMoneyBillTransfer,
  FaFileInvoiceDollar,
} from "react-icons/fa6";
import { MdCoPresent } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import { GiSandsOfTime } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { RiSettingsFill } from "react-icons/ri";
import { PiSlideshowFill } from "react-icons/pi";

// NavLinks
export const navLinks = [
  {
    icon: <PiSlideshowFill className="-ml-0.5 text-xl" title="Slides" />,
    id: 3,
    path: "/slides-management",
    title: "Slides Management",
  },
  // {
  //   icon: <GoHomeFill className="-ml-0.5 text-xl" title="Invoices" />,
  //   id: 3,
  //   path: "/dashboard",
  //   title: "Dashboard",
  // },
  // {
  //   icon: <AiFillDollarCircle className="-ml-0.5 text-xl" title="Invoices" />,
  //   id: 3,
  //   path: "/company-invoices",
  //   title: "Invoices",
  // },
  // {
  //   icon: <BsBuildingsFill className="text-base" title="Companies" />,
  //   id: 4,
  //   path: "/companies",
  //   title: "Companies",
  // },
  // {
  //   icon: <BiSolidPackage className="-ml-0.5 text-xl" title="Packages" />,
  //   id: 5,
  //   path: "/packages",
  //   title: "Packages",
  // },
  // {
  //   icon: (
  //     <FaMoneyBillTransfer
  //       className="-ml-0.5 text-lg"
  //       title="Transaction Logs"
  //     />
  //   ),
  //   id: 5,
  //   path: "/transactions",
  //   title: "transaction_logs",
  // },
  // {
  //   icon: <RiSettingsFill className="-ml-0.5 text-lg" title="Settings" />,
  //   id: 5,
  //   title: "settings",
  //   items: [
  //     {
  //       title: "admin_options",
  //       path: "/settings/admin-options",
  //     },
  //     {
  //       title: "work_types",
  //       path: "/settings/work-types",
  //     },
  //     {
  //       title: "terms",
  //       path: "/settings/terms",
  //     },
  //     {
  //       title: "help",
  //       path: "/settings/help",
  //     },
  //   ],
  // },
];

// Dashboard Analytics
export const dashboardCards = [
  {
    title: "Total_Company",
    icon: <IoMdBriefcase className="text-lg text-blue-500" />,
    colSpan: "col-span-2",
  },
  {
    title: "Total_Project_Manager",
    icon: <MdCoPresent className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total_Workers",
    icon: <FaPersonDigging className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total_Sales",
    icon: <BsPersonBadgeFill className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total_Lead",
    icon: <IoMdBriefcase className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total_Task",
    icon: <FaClipboardList className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total_Invoice",
    icon: <FaFileInvoiceDollar className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total_Invoice_Pending",
    icon: <GiSandsOfTime className="text-lg text-blue-500" />,
    colSpan: "col-span-2 sm:col-span-1",
  },
  {
    title: "Total_Invoice_Paid",
    icon: (
      <BsFillFileEarmarkCheckFill
        GorceryarmarkCheckFill
        className="text-lg text-blue-500"
      />
    ),
    colSpan: "col-span-2 sm:col-span-1",
  },
];

export const colors = {
  error: "border-red-600 bg-red-100 text-red-600",
  info: "border-blue-600 bg-blue-100 text-blue-600",
  warning: "border-yellow-600 bg-yellow-100 text-yellow-600",
  success: "border-green-600 bg-green-100 text-green-600",
};

export const paginationEntries = ["All", 50, 100, 200, 500, 1000];
