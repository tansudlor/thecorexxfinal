"use client";

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
// import LoginButton from "@/components/loginButton";
// import LottoBalance from "@/components/lottoBalance";
// import useUser from "@/hooks/useUser";

// export function Navigation() {
//   return <div>test</div>
// }

export function Navigation() {
  // const { user } = useUser();

  return (
    // <div className="flex h-20 w-full items-center px-4 md:px-6 border-b border-gray">
    <div className="flex h-20 w-full items-center px-4 md:px-6 border-b border-gray absolute z-[999] bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          {/* <Link href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link> */}
          <div className="grid gap-2 py-6">
            {/* <Link className="flex w-full items-center py-2 text-lg font-semibold" href="https://www.playbux.co/">
              Pre-Alpha
            </Link> */}

          </div>
        </SheetContent>
      </Sheet>
      <div className="">
        <Link className="mr-6 hidden lg:flex w-[200px] h-[56px]" href="#">
          {/* <MountainIcon className="h-6 w-6" /> */}
          <Image
            src="/images/logo_playbux_rectangle.svg"
            alt="logo"
            width={100}
            height={100}
            className="cursor-pointer w-full h-auto"
          // onClick={() => router.push('/')}
          />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </div>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className=" gap-8 text-gray-3 font-[500]">
          <NavigationMenuLink asChild>
            {/* <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="https://www.playbux.co/"
            >
              Pre-Alpha
            </Link> */}
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex w-full justify-end gap-4">

        <div className="">
          <div className="flex gap-2">
            {/* <LottoBalance /> */}
            <ConnectButton
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "address",
              }}
              chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
            />
          </div>
        </div>

        {/* <LoginButton /> */}
      </div>
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
