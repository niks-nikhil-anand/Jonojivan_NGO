"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import logo from "../../../../public/logo/logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const programItems = [
    {
      href: "/gender-equality-project-being-a-girl",
      title: "Gender Equality - Being a Girl",
      description: "Empowering girls through education and awareness programs",
    },
    {
      href: "/fight-against-poverty",
      title: "Fight Against Poverty",
      description: "Creating sustainable solutions to break the poverty cycle",
    },
    {
      href: "/health-and-nutrition",
      title: "Health and Nutrition",
      description: "Ensuring access to healthcare and proper nutrition",
    },
    {
      href: "/non-formal-education-gyanoday",
      title: "Non-Formal Education - Gyanoday",
      description: "Providing quality education through innovative methods",
    },
    {
      href: "/child-rights-and-education",
      title: "Child Rights and Education",
      description:
        "Protecting children's rights and ensuring quality education",
    },
  ];

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/how-we-work", label: "How We Work" },
    { href: "/posts-grid", label: "News & Updates" },
    { href: "/contact", label: "Contact" },
  ];

  const ListItem = React.forwardRef(
    ({ className, title, children, ...props }, ref) => {
      return (
        <li>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </a>
          </NavigationMenuLink>
        </li>
      );
    }
  );
  ListItem.displayName = "ListItem";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <nav className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Plan to Empower Logo"
              width={200}
              height={100}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}

              {/* Programs Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-border shadow-lg rounded-md">
                  <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                    {programItems.map((item) => (
                      <ListItem
                        key={item.href}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Desktop Donate Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block"
          >
            <Button
              asChild
              className="bg-[#e91e63] hover:bg-[#d81b60] text-white shadow-md"
            >
              <Link href="/donate-now" className="flex items-center space-x-2">
                <span>Donate Now</span>
                <Heart className="h-4 w-4 fill-current" />
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white border-l border-border"
            >
              {/* Close Button */}
              <div className="absolute right-4 top-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:bg-gray-100 transition-colors rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <SheetHeader className="pt-8">
                <SheetTitle className="flex items-center space-x-2">
                  <Image src={logo} alt="Logo" width={40} height={40} />
                  <span className="text-green-600 font-bold">
                    Plan to Empower
                  </span>
                </SheetTitle>
                <SheetDescription>
                  Empowering communities through sustainable development
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                {/* Mobile Menu Items */}
                {menuItems.map((item) => (
                  <motion.div
                    key={item.href}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 px-3 text-lg font-medium hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Programs Dropdown */}
                <div className="bg-gray-50 rounded-lg p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-3 h-auto hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-lg font-medium">Programs</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 bg-white border border-border shadow-xl rounded-lg">
                      {programItems.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="flex flex-col items-start space-y-1 p-4 hover:bg-gray-50 transition-colors rounded-md m-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="font-medium text-foreground">
                              {item.title}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {item.description}
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile Donate Button */}
                <motion.div whileTap={{ scale: 0.95 }} className="pt-4">
                  <Button
                    asChild
                    className="w-full bg-[#e91e63] hover:bg-[#d81b60] text-white shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link
                      href="/donate-now"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>Donate Now</span>
                      <Heart className="h-4 w-4 fill-current" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
