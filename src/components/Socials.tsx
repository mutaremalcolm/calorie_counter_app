import React from "react";
import {  
  RiLinkedinFill, 
  RiGithubFill, 
  RiTwitterFill,  
} from "react-icons/ri";

type SocialsProps = {
  containerStyles?: string;
  iconStyles?: string;
};

const icons = [
  {
    path: "https://www.linkedin.com/in/malcolm-mutare-a234a61aa/",
    name: <RiLinkedinFill />
  },
  {
    path: "https://github.com/mutaremalcolm",
    name: <RiGithubFill />
  },
  {
    path: "https://twitter.com/MalcolmTech",
    name: <RiTwitterFill />
  },
];

const Socials: React.FC<SocialsProps> = ({ containerStyles = "", iconStyles = "" }) => {
  return (
    <div className={containerStyles}>
      {icons.map((icon, index) => (
        <a href={icon.path} key={index} target="_blank" rel="noopener noreferrer">
          <div className={iconStyles}>
            {icon.name}
          </div>
        </a>
      ))}
    </div>
  );
};

export default Socials;
