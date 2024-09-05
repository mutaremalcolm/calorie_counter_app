import { useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import Hero from "@/components/Hero";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <>
      <ClerkProvider
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        publishableKey={PUBLISHABLE_KEY}
      >
        <Navbar /> 
        <Hero />
        {/* <main className="min-h-screen"> 
          <Outlet />
        </main> */}
        <Footer /> 
      </ClerkProvider>
    </>
  );
}
