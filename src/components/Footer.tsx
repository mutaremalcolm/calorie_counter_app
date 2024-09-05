import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="bg-white shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 sm:justify-center">
          <a
            href="https://github.com/mutaremalcolm"
            className="text-gray-500 hover:text-gray-900"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/malcolm-mutare-a234a61aa/" 
            className="text-gray-500 hover:text-gray-900">
            <FaLinkedin />
          </a>
          <a 
            href="https://x.com/MalcolmTech" 
            className="text-gray-500 hover:text-gray-900">
            <FaTwitter />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
