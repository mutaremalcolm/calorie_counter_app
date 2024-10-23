import Socials from "./Socials"

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 py-12 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between">
          {/* socials */}
          <Socials 
            containerStyles="flex gap-x-6 xl:mx-0 mb-4"
            iconStyles="text-primary dark:text-white/70 text-[20px] hover:text-primary 
              dark:hover:text-primary transition-all"
          />
          {/* copyright */}
          <div className="text-muted-foreground dark:text-gray-400 transition-colors duration-300">
            Copyright &copy; Made with Love By Malcolm Mutare. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  ) 
}

export default Footer