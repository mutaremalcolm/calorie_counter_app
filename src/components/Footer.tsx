import { Link } from "react-router-dom";
import { footerLinks } from "../lib/constants" 
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className='flex flex-col text-black-100 mt-5 border-t 
    border-gray-100'>
        <div className='flex max-md:flex-col
        flex-wrap justify-between gap-5 sm:px-16
        px-6 py-10'>
            <div className='flex flex-col
            justify-start items-start gap-6'>
                <Button className="bg-purple-500">
                  Calorie
                </Button>    
              <p className='text-base text-purple-600'>
                    Calorie 2024 <br />
                    All rights reserved &copy;
              </p>
            </div>

            <div className='footer__links'>
             {footerLinks.map((link) => (
                <div key={link.title} 
                className='footer__link'>
                    <h3 className='font-bold'>{link.title}</h3>
                        {link.links.map((item) => (
                            <Link 
                                key={item.title}
                                to={item.url}
                                className='text-grey-600'
                                >
                                {item.title}
                            </Link>
                        ))} 
                </div>
             ))}
            </div>
            </div>
            <div className='flex justify-between
            items-center flex-wrap mt-10 border-t
            border-gray-100 sm:px-16 px-6 py-10 '>
                <div className='footer__copyrights-link'>
                    <p>
                        @2024 Calorie. All Rights Reserved
                    </p>


                    <Link to='/' className='text-gray-500'>
                        Privacy Policy
                    </Link>
                    <Link to='/' className='text-gray-500'>
                        Terms of Use
                    </Link>

                </div>
            </div>
    </footer>
  )
}

export default Footer