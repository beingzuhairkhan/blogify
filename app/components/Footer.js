import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8 border-t border-gray-300">
      <div className="container mx-auto flex flex-col items-center">
        {/* Brand Name */}
        <div className="text-2xl font-bold mb-4">
          Blogify
        </div>

      

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-4">
          <a
            href="https://twitter.com/beingzuhairkhan"
       
            className="hover:text-blue-500 transition"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/zuhair-khan-55b9a624a"
         
            className="hover:text-blue-700 transition"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/beingzuhairkhan"
        
            className="hover:text-gray-900 transition"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://zuhairfolio.netlify.app/"
            
            className="hover:text-purple-500 transition"
          >
            <span className="font-semibold text-sm">Portfolio</span>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 px-4 mt-6">
        {/* Centered Links */}
        <div className="mb-4 md:mb-0 text-center md:flex md:space-x-8">
          <a href="/about" className="hover:text-gray-600 transition">
            About Us
          </a>
          <a href="/contact" className="hover:text-gray-600 transition">
            Contact
          </a>
          <a href="/privacy-policy" className="hover:text-gray-600 transition">
            Privacy Policy
          </a>
        </div>

        {/* Right-Aligned Text */}
        <div className="text-right">
          © {new Date().getFullYear()} Blogify. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
