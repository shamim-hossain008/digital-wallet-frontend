/* eslint-disable no-empty */
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { role } from "@/constants/role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { clearAuth } from "@/redux/features/auth/auth.slice";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggler";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/agent", label: "Dashboard", role: role.agent },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accessToken, user } = useAppSelector((state) => state.auth);

  const isLoggedIn = !!accessToken;
  const userRole = user?.role;

  useUserInfoQuery(undefined, { skip: !accessToken });

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.log(err);
    }

    try {
      localStorage.removeItem("dw_auth");
    } catch {}

    dispatch(clearAuth());
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };
  // render a single element per link and use href as key
  const renderLinks = () =>
    navigationLinks.map((link) => {
      const showPublic = link.role === "PUBLIC";
      const showForRole = !!userRole && link.role === userRole;
      if (!showPublic && !showForRole) return null;

      return (
        <NavigationMenuItem key={link.href} className="w-full">
          <NavigationMenuLink asChild className="py-1.5">
            <Link to={link.href}>{link.label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    });

  return (
    <header className="border-b">
      <div className="flex container mx-auto px-4 h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 17H20" stroke="currentColor" strokeWidth="2" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-44 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {renderLinks()}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {renderLinks()}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {/* show Logout when email present, otherwise show Login */}
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              variant={"outline"}
              className="text-sm"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
