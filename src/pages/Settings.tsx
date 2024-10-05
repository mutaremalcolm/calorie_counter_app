
import Sidebar from "@/components/Sidebar";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/8"> 
        <Sidebar />
      </div>
      <div className="flex-1 p-4 text-purple-500"> 
        <Heading
          title="Settings"
          description="Manage account settings."
          icon={SettingsIcon}
          iconColor="text-purple-500"
          bgColor="bg-purple-700/10"
        />
        <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
                {"Make changes to your account."}
            </div>
            <Button className="bg-purple-500">
                Manage Account
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
