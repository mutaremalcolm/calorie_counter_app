import { footerLinks, footerContactInfo, socials } from "../lib/constants";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="flexCenter mb-12 ml-5 mr-5 mt-10">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link to="/" className="mb-10 hidden lg:flex">
            <Button className="bg-purple-500">Calorie</Button>
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {footerLinks.map((columns) => (
              <FooterColumn title={columns.title} key={columns.title}>
                <ul className="regular-14 flex flex-col gap-4 text-gray-30">
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
                    className="flex gap-4 md:flex-col lg:flex-row font-nunito-sans"
                  >
                    <p className="medium-14 whitespace-nowrap">{link.name}</p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={socials.title}>
                <ul className="regular-14 flex gap-4 text-gray-30">
                  {socials.links.map((link) => (
                    <Link
                      to={link.url}
                      key={link.title}
                      className="bg-white p-1 rounded-full text-black font-bold"
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

        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-gray-30">
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
