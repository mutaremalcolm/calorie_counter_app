import { Heading } from "./Heading"
import { Settings } from 'lucide-react'
import { Button } from './ui/button'


const SettingsPage =  () => {
    

  return (
    <div>
        <Heading
          title="Settings"
          description="Manage account settings."
          icon={Settings}
          iconColor="text-gray-700"
          bgColor="bg-gray-700/10"
        />
        <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
                {"You are currently on a pro plan." }
            </div>
            <Button />
        </div>
    </div>
  )
}

export default SettingsPage