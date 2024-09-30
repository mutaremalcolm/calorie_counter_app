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
  },
];


const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white text-zinc-400">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              to={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-purple-500` hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-zinc-400 bg-purple/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
