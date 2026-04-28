import { useA11y } from "../context/AccessibilityContext";
import { postsArr } from "../data/data";

export default function SearchPage() {
  const { speak } = useA11y();
  const suggestions = ["Travel", "Food", "Photography", "Art", "Beach", "City"];

  const describePost = (post) => {
    speak(
      `${post.user}'s post. ${post.caption} The image shows ${post.altText}.`,
      { force: true }
    );
  };

  return (
    <section className="min-h-full bg-white px-4 pb-6 pt-3 dark:bg-black">
      <div className="sticky top-0 z-10 bg-white pb-3 dark:bg-black">
        <div className="flex items-center rounded-xl bg-zinc-100 px-4 py-3 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-3 h-5 w-5">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Search creators, places, and moods
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {suggestions.map((tag) => (
          <button
            key={tag}
            type="button"
            data-search-suggestion
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1">
        {postsArr.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => describePost(post)}
            data-search-post
            data-user={post.user}
            data-caption={post.caption}
            data-alt-text={post.altText}
            data-hashtags={post.hashtags.join("|")}
            className="relative aspect-square overflow-hidden bg-zinc-100 text-left focus:outline-none focus:ring-2 focus:ring-pink-400"
            aria-label={`Describe post from ${post.user}`}
          >
            <img src={post.imageUrl} alt={post.altText} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
              <p className="truncate text-xs font-semibold">{post.user}</p>
            </div>
          </button>
        ))}
        {postsArr.map((post) => (
          <button
            key={`${post.id}-alt`}
            type="button"
            onClick={() => describePost(post)}
            data-search-post
            data-user={post.user}
            data-caption={post.caption}
            data-alt-text={post.altText}
            data-hashtags={post.hashtags.join("|")}
            className="relative aspect-square overflow-hidden bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
            aria-label={`Describe post from ${post.user}`}
          >
            <img src={post.imageUrl} alt={post.altText} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
