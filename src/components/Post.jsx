import { useA11y } from "../context/AccessibilityContext";
import { useMessages } from "../context/MessagesContext";

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M21 6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11l4-4h12a2 2 0 0 0 2-2V6z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4Z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
      <path d="M6 3h12v18l-6-4-6 4V3Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function DirectMessageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8l-2 2V4h14v12z" />
    </svg>
  );
}

export default function Post({ user, imageUrl, altText, caption, hashtags = [], comments = [] }) {
  const { announce } = useA11y();
  const { startNewConversation, conversations } = useMessages();

  const handleLike = () => {
    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate(50);
    }

    if (typeof Audio !== "undefined") {
      const audio = new Audio("/sounds/like-chime.mp3");
      audio.play().catch(() => {});
    }

    announce(`Liked ${user}'s post`);
  };

  const handleMessage = () => {
    // Check if conversation already exists
    const existingConversation = conversations.find(conv => conv.user === user);
    if (existingConversation) {
      // If conversation exists, select it
      window.dispatchEvent(new CustomEvent('openConversation', { detail: { conversationId: existingConversation.id } }));
    } else {
      // Create new conversation
      const avatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop';
      startNewConversation(user, avatar);
      window.dispatchEvent(new CustomEvent('openMessaging', { detail: { user } }));
    }
    announce(`Opening message to ${user}`);
  };

  return (
    <article
      className="mx-auto w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black"
      data-post
      data-user={user}
      data-caption={caption}
      data-alt-text={altText}
      data-hashtags={hashtags.join("|")}
      data-comments={comments.join("|")}
    >
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <div className="h-9 w-9 rounded-full border-2 border-white bg-zinc-200 dark:border-black" />
          </div>
          <button
            type="button"
            className="ml-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {user}
          </button>
        </div>
        <button
          type="button"
          aria-label={`More options for ${user}`}
          className="rounded-full p-1 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <MoreIcon />
        </button>
      </header>

      <div className="relative">
        <img
          src={imageUrl}
          alt={altText}
          className="aspect-square w-full object-cover"
          onDoubleClick={handleLike}
        />
        <button
          aria-label="Read image description"
          onClick={() => announce(altText)}
          className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1.5 text-[0.7rem] font-semibold text-white backdrop-blur"
        >
          AD
        </button>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={handleLike}
              aria-label="Like post"
              className="rounded-lg p-1 text-zinc-900 focus:ring-2 focus:ring-pink-400 dark:text-zinc-100"
            >
              <HeartIcon />
            </button>
            <button
              aria-label="Comment"
              className="rounded-lg p-1 text-zinc-900 focus:ring-2 focus:ring-pink-400 dark:text-zinc-100"
            >
              <ChatIcon />
            </button>
            <button
              onClick={handleMessage}
              aria-label="Message post author"
              className="rounded-lg p-1 text-zinc-900 focus:ring-2 focus:ring-pink-400 dark:text-zinc-100"
            >
              <DirectMessageIcon />
            </button>
            <button
              aria-label="Share post"
              className="rounded-lg p-1 text-zinc-900 focus:ring-2 focus:ring-pink-400 dark:text-zinc-100"
            >
              <SendIcon />
            </button>
          </div>
          <button
            aria-label="Save post"
            className="rounded-lg p-1 text-zinc-900 focus:ring-2 focus:ring-pink-400 dark:text-zinc-100"
          >
            <BookmarkIcon />
          </button>
        </div>

        <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          2,184 likes
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300" data-post-caption>
          <span className="mr-2 font-semibold text-zinc-900 dark:text-zinc-100">{user}</span>
          {caption}
        </p>
        {hashtags.length > 0 && (
          <p className="mt-2 text-sm text-pink-600 dark:text-pink-400">
            {hashtags.join(" ")}
          </p>
        )}
        <button type="button" className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          View all {comments.length || 24} comments
        </button>
        <p className="mt-1 text-[0.7rem] uppercase tracking-wide text-zinc-400">
          2 hours ago
        </p>
      </div>
    </article>
  );
}
