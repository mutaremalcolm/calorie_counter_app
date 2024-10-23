import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import {
  CalendarRange,
  CircleGauge,
  Dumbbell,
  FlameIcon,
  PizzaIcon,
  Settings,
  Target,
} from "lucide-react";

const routes = [
  {
    label: "DashBoard",
    icon: CircleGauge,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Calories Burnt",
    icon: FlameIcon,
    href: "/CaloriesBurnt",
    color: "text-red-500",
  },
  {
    label: "Calories Consumed",
    icon: PizzaIcon,
    href: "/CaloriesConsumed",
    color: "text-pink-700",
  },
  {
    label: "Daily Target",
    icon: Target,
    href: "/DailyTarget",
    color: "text-orange-700",
  },
  {
    label: "Weekly Target",
    icon: CalendarRange,
    href: "/WeeklyTarget",
    color: "text-emerald-500",
  },
  {
    label: "Progress Tracker",
    icon: Dumbbell,
    href: "/ProgressTracker",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500 dark:text-gray-400",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-2 flex-1">
        <Link to="/" className="flex items-center pl-3 mb-8">
          <h1 className="text-xl font-bold text-black dark:text-white">
            Calorie Tracker
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              to={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer",
                "rounded-lg transition-all duration-300",
                "hover:bg-gray-100 dark:hover:bg-gray-800/50",
                pathname === route.href ? 
                  "bg-gray-100 dark:bg-gray-800/50 text-black dark:text-white" : 
                  "text-zinc-500 dark:text-zinc-400",
                "hidden md:flex" // Hide on mobile, show on medium screens and up
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon 
                  className={cn(
                    "h-5 w-5 mr-3 transition-colors",
                    route.color,
                    pathname === route.href && "animate-pulse"
                  )} 
                />
                <span className="truncate">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 p-2">
        <div className="flex justify-around">
          {routes.map((route) => (
            <Link
              to={route.href}
              key={route.href}
              className={cn(
                "p-2 rounded-lg transition-colors",
                pathname === route.href ? 
                  "bg-gray-100 dark:bg-gray-800" : 
                  "text-zinc-500 dark:text-zinc-400"
              )}
            >
              <route.icon 
                className={cn(
                  "h-6 w-6",
                  route.color,
                  pathname === route.href && "animate-pulse"
                )} 
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;