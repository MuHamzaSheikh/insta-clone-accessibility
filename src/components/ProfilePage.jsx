import { postsArr } from "../data/data";

export default function ProfilePage() {
  const profilePosts = postsArr.slice(0, 6);
  const profile = {
    username: "insta_user",
    displayName: "Insta User",
    posts: "42",
    followers: "12.8k",
    following: "389",
    bio: "Visual diary of food, travel, and color studies. Saving moments, sunsets, and soft chaos.",
  };

  return (
    <section
      className="min-h-full bg-white px-4 pb-6 pt-4 dark:bg-black"
      data-profile-page
      data-username={profile.username}
      data-display-name={profile.displayName}
      data-posts={profile.posts}
      data-followers={profile.followers}
      data-following={profile.following}
      data-bio={profile.bio}
    >
      <div className="flex items-start gap-5">
        <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px]">
          <div className="h-20 w-20 rounded-full border-4 border-white bg-zinc-200 dark:border-black" />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{profile.username}</h2>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-base font-semibold text-zinc-900 dark:text-white">{profile.posts}</p>
              <p className="text-xs text-zinc-500">posts</p>
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-900 dark:text-white">{profile.followers}</p>
              <p className="text-xs text-zinc-500">followers</p>
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-900 dark:text-white">{profile.following}</p>
              <p className="text-xs text-zinc-500">following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">{profile.displayName}</p>
        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {profile.bio}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          aria-label="Edit Profile"
          className="flex-1 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-white"
        >
          Edit Profile
        </button>
        <button
          type="button"
          aria-label="Share Profile"
          className="flex-1 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-white"
        >
          Share Profile
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-1 border-t border-zinc-200 pt-3 dark:border-zinc-800">
        {profilePosts.map((post) => (
          <article key={post.id} className="aspect-square overflow-hidden bg-zinc-100">
            <img src={post.imageUrl} alt={post.altText} className="h-full w-full object-cover" />
          </article>
        ))}
      </div>
    </section>
  );
}
