import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500 ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white">
                Sahand's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About"></Footer.Title>
              <Footer.LinkGroup>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                  Sahand's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
        <Footer.Title title="Follow Us"></Footer.Title>
        <Footer.LinkGroup>
            <Footer.Link href="https://www.github.com/anshtrivediaiml" target="_blank" rel='noopener noreferrer'> Github 
            </Footer.Link>
            <Footer.Link href="#" target="_blank" rel='noopener noreferrer'> Discord
            </Footer.Link>
        </Footer.LinkGroup>
        </div>

        <div>
        <Footer.Title title="Legal"></Footer.Title>
        <Footer.LinkGroup>
            <Footer.Link href="#" > Privacy Policy
            </Footer.Link>
            <Footer.Link href="/about" target="_blank" rel='noopener noreferrer'>Terms &amp; Conditions
            </Footer.Link>
        </Footer.LinkGroup>
        </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;