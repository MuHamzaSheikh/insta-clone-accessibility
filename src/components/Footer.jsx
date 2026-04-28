function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3.17 4 9.57V21h5v-6h6v6h5V9.57L12 3.17Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ReelsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="4" />
      <path d="M7 4 10 8" />
      <path d="M14 4 17 8" />
      <path d="m10 16 5-3-5-3v6Z" />
    </svg>
  );
}

function ShopIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <path d="M6 7h12l-1 12H7L6 7Z" />
      <path d="M9 7a3 3 0 1 1 6 0" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

const navItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Search", icon: <SearchIcon /> },
  { label: "Reels", icon: <ReelsIcon /> },
  { label: "Shop", icon: <ShopIcon /> },
  { label: "Profile", icon: <ProfileIcon /> },
];

export default function Footer({ activePage = "Home", onNavigate }) {
  return (
    <footer className="sticky bottom-0 z-30 border-t border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <nav aria-label="Primary" className="mx-auto max-w-[470px] px-2">
        <ul className="grid h-16 grid-cols-5 items-center">
          {navItems.map((item) => (
            <li key={item.label} className="flex justify-center">
              <button
                type="button"
                aria-label={item.label}
                onClick={() => onNavigate?.(item.label)}
                className={`rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-pink-400 dark:hover:bg-zinc-800 ${
                  activePage === item.label
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                    : "text-zinc-900 hover:bg-zinc-100 dark:text-white"
                }`}
              >
                {item.icon}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
