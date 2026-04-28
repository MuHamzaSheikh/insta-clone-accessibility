import { useA11y } from "../context/AccessibilityContext";
import { postsArr } from "../data/data";

export default function ReelsPage() {
  const { speak } = useA11y();

  const describeReel = (post) => {
    speak(
      `${post.user}'s reel. ${post.caption} This reel shows ${post.altText}.`,
      { force: true }
    );
  };

  return (
    <section className="min-h-full bg-black text-white">
      <div className="space-y-4 p-4">
        {postsArr.slice(0, 3).map((post) => (
          <article
            key={post.id}
            className="relative overflow-hidden rounded-2xl bg-zinc-900"
            data-reel
            data-user={post.user}
            data-caption={post.caption}
            data-alt-text={post.altText}
            data-hashtags={post.hashtags.join("|")}
          >
            <button
              type="button"
              onClick={() => describeReel(post)}
              className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-pink-400"
              aria-label={`Describe reel from ${post.user}`}
            >
              <img
                src={post.imageUrl}
                alt={post.altText}
                className="h-[28rem] w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                <div className="max-w-[72%]">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full border border-white/50 bg-white/20" />
                    <div>
                      <p className="text-sm font-semibold">{post.user}</p>
                      <p className="text-xs text-white/70">Original audio</p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-white/90">{post.caption}</p>
                  <p className="mt-2 text-xs text-pink-300">{post.hashtags.join(" ")}</p>
                </div>

                <div className="flex flex-col items-center gap-5 pb-2 text-xs text-white/90">
                  <span className="text-2xl">Like</span>
                  <span>18.2k</span>
                  <span className="text-2xl">Talk</span>
                  <span>412</span>
                  <span className="text-2xl">Send</span>
                  <span>Share</span>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
