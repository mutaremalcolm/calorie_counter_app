import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { footerLinks, footerContactInfo, socials } from "../lib/constants";

const Footer = () => {
  return (
    <footer className="flexCenter mb-12 ml-5 mr-5 mt-10 bg-pink-50">
      <div className="padding-container max-container flex w-full flex-col gap-14 pl-4 pt-4 pr-4 rounded-">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          {/* Logo */}
          <Link to="/" className="mb-10 hidden lg:flex">
            <Button className="bg-purple-500 font-semibold">Calorie</Button>
          </Link>
          {/* links */}
          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {footerLinks.map((columns) => (
              <FooterColumn title={columns.title} key={columns.title}>
                <ul className="flex font-nunito-sans text-gray-500 flex-col gap-4 text-gray-30">
                  {columns.links.map((link) => (
                    <Link to={link.url} key={link.title}>
                      {link.title}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className="flex flex-col gap-5">
              <FooterColumn title={footerContactInfo.title}>
                {footerContactInfo.links.map((link) => (
                  <Link
                    to={link.link}
                    key={link.name}
                    className="flex font-nunito-sans text-gray-500 gap-4 md:flex-col lg:flex-row font-nunito-sansk"
                  >
                    <p className="medium-14 whitespace-nowrap">{link.name}</p>
                  </Link>
                ))}
              </FooterColumn>
            </div>
            {/* socials */}
            <div className="flex flex-col gap-5">
              <FooterColumn title={socials.title}>
                <ul className="regular-14 flex gap-4 text-gray-30">
                  {socials.links.map((link) => (
                    <Link
                      to={link.url}
                      key={link.title}
                      className="bg-transparent p-1 rounded-full text-black font-bold"
                    >
                      <img
                        src={link.icon}
                        alt="social icon"
                        width={24}
                        height={24}
                      />
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border bg-pink-100" />
        <p className="regular-14 w-full text-center text-gray-30 pb-5">
          @2024 Calorie. Made with Love by Malcolm
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
