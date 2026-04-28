import { useA11y } from "../context/AccessibilityContext";

export default function Stories({ stories }) {
  const { announce } = useA11y();

  return (
    <div
      className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide"
      role="region"
      aria-label="User Stories"
    >
      {stories.map((story) => (
        <button
          key={story.id}
          onClick={() =>
            announce(`Opening story from ${story.user}: ${story.description}`)
          }
          className="group flex flex-shrink-0 flex-col items-center gap-1.5 focus:outline-none"
          aria-label={`View story from ${story.user}`}
        >
          <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] transition-transform group-hover:scale-105 group-focus:scale-105">
            <div className="h-[4.25rem] w-[4.25rem] overflow-hidden rounded-full border-2 border-white bg-zinc-200 dark:border-black">
              <img
                src={`https://i.pravatar.cc/150?u=${story.id}`}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <span className="max-w-[4.75rem] truncate text-[0.72rem] font-medium text-zinc-800 dark:text-zinc-100">
            {story.user}
          </span>
        </button>
      ))}
    </div>
  );
}
