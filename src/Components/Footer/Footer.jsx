import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#005DAA] backdrop-blur-md text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-sm">© ToolFlix.Tous droits réservés..</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
