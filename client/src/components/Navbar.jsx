// components/Navbar.jsx
import { Home, Layers, Folder, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Home', icon: <Home size={18} />, to: '/' },
  { name: 'Services', icon: <Layers size={18} />, to: '/services' },
  { name: 'Projects', icon: <Folder size={18} />, to: '/projects' },
  { name: 'About', icon: <User size={18} />, to: '/about' },
  { name: 'Contact', icon: <Phone size={18} />, to: '/contact' }
];

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 text-xl font-bold text-white">
            <Layers size={24} className="text-indigo-400" />
            <Link to={"/"} className="tracking-wide">MyBrand</Link>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 hover:underline underline-offset-4"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
