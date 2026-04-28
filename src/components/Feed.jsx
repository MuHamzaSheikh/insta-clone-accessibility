import Post from "./Post";

export default function Feed({ posts, onProfileClick }) {
  return (
    <section className="w-full pb-6" role="feed" aria-label="Social media feed">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            user={post.user}
            imageUrl={post.imageUrl}
            altText={post.altText}
            caption={post.caption}
            hashtags={post.hashtags}
            comments={post.comments}
            onProfileClick={() => onProfileClick && onProfileClick(post.user)}
          />
        ))
      ) : (
        <div className="py-12 text-center text-zinc-500">
          <p>No posts to display</p>
        </div>
      )}
    </section>
  );
}
