import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';

export const Navbar = () => {
  const navItems = [
    { icon: <Home />, label: 'Home' },
    { icon: <Search />, label: 'Explore' },
    { icon: <PlusSquare />, label: 'New Post' },
    { icon: <MessageCircle />, label: 'Messages' },
    { icon: <User />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-contrast-edge px-4 pb-8 pt-4">
      <ul className="flex justify-around items-center max-w-2xl mx-auto">
        {navItems.map((item) => (
          <li key={item.label}>
            <button 
              className="p-3 rounded-2xl transition-all 
                         hover:bg-brand-soft focus:ring-4 focus:ring-purple-500 
                         focus:outline-none active:scale-95"
            >
              <AccessibleIcon.Root label={item.label}>
                {item.icon}
              </AccessibleIcon.Root>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};