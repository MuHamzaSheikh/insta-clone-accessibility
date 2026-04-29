function HeartOutlineIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-9 8.44 8.5 8.5 0 0 1-4.2-1.1L3 20l1.26-4.15A8.38 8.38 0 0 1 3 11.5 8.5 8.5 0 0 1 11.5 3 8.5 8.5 0 0 1 20 11.5Z" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5 2 2" />
    </svg>
  );
}

export default function Header({ activePage = "Home", onNavigate }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-14 max-w-[470px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600" />
          <span className="text-[1.4rem] font-semibold tracking-tight text-zinc-950 dark:text-white">
            Instagram
          </span>
        </div>

        <div className="flex items-center gap-4 text-zinc-900 dark:text-white">
          <button
            type="button"
            aria-label="Activity"
            className="rounded-full p-1.5 transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:hover:bg-zinc-800"
          >
            <HeartOutlineIcon />
          </button>
          <button
            type="button"
            aria-label="Messages"
            onClick={() => onNavigate?.("Messages")}
            className={`rounded-full p-1.5 transition focus:outline-none focus:ring-2 focus:ring-pink-400 ${
              activePage === "Messages"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <MessengerIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
