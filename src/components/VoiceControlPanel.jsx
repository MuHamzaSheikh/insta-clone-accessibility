import { useEffect, useRef, useState } from "react";
import { useA11y } from "../context/AccessibilityContext";

function MicIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10a7 7 0 0 1-14 0" />
      <path d="M12 19v3" />
      <path d="M8 22h8" />
    </svg>
  );
}

function getSpeechRecognition() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function triggerClick(selectors) {
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      element.click();
      return true;
    }
  }

  return false;
}

function getScrollContainer() {
  return document.querySelector('main[data-page-container="true"]') || window;
}

function scrollWithinMain(direction = "down") {
  const scrollContainer = getScrollContainer();
  const amount = window.innerHeight * 0.75;
  const top = direction === "up" ? -amount : amount;

  if (scrollContainer === window) {
    window.scrollBy({ top, behavior: "smooth" });
    return;
  }

  scrollContainer.scrollBy({ top, behavior: "smooth" });
}

function scrollToTop() {
  const scrollContainer = getScrollContainer();

  if (scrollContainer === window) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
}

function getVisibleItem(selector) {
  const items = Array.from(document.querySelectorAll(selector));

  if (!items.length) {
    return null;
  }

  const viewportCenter = window.innerHeight / 2;

  const bestMatch = items
    .map((item) => {
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter);

      return { item, rect, distance };
    })
    .filter(({ rect }) => rect.bottom > 80 && rect.top < window.innerHeight - 80)
    .sort((a, b) => a.distance - b.distance)[0];

  return bestMatch?.item || items[0];
}

function getVisiblePost() {
  return getVisibleItem("[data-post]");
}

function getPostDetails(post) {
  if (!post) {
    return null;
  }

  return {
    user: post.dataset.user || "Unknown creator",
    caption: post.dataset.caption || "",
    altText: post.dataset.altText || "",
    hashtags: (post.dataset.hashtags || "").split("|").filter(Boolean),
    comments: (post.dataset.comments || "").split("|").filter(Boolean),
  };
}

function getPageItemDetails(page) {
  if (page === "Search" || page === "Shop") {
    const item = getVisibleItem("[data-search-post]");

    if (!item) {
      return null;
    }

    return {
      type: "search-post",
      user: item.dataset.user || "Unknown creator",
      caption: item.dataset.caption || "",
      altText: item.dataset.altText || "",
      hashtags: (item.dataset.hashtags || "").split("|").filter(Boolean),
    };
  }

  if (page === "Reels") {
    const item = getVisibleItem("[data-reel]");

    if (!item) {
      return null;
    }

    return {
      type: "reel",
      user: item.dataset.user || "Unknown creator",
      caption: item.dataset.caption || "",
      altText: item.dataset.altText || "",
      hashtags: (item.dataset.hashtags || "").split("|").filter(Boolean),
    };
  }

  if (page === "Profile") {
    const profile = document.querySelector("[data-profile-page]");

    if (!profile) {
      return null;
    }

    return {
      type: "profile",
      username: profile.dataset.username || "insta_user",
      displayName: profile.dataset.displayName || "Insta User",
      bio: profile.dataset.bio || "",
      posts: profile.dataset.posts || "",
      followers: profile.dataset.followers || "",
      following: profile.dataset.following || "",
    };
  }

  return null;
}

function normalizeCommand(transcript) {
  return transcript.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function matchesAny(command, phrases) {
  return phrases.some((phrase) => command.includes(phrase));
}

function speakProfileSummary(profile, speak) {
  speak(
    `${profile.displayName}, username ${profile.username}. ${profile.bio}. ${profile.posts} posts, ${profile.followers} followers, and ${profile.following} following.`,
    { force: true }
  );
}

export default function VoiceControlPanel({ activePage = "Home", onNavigate }) {
  const { announce, speak } = useA11y();
  const recognitionRef = useRef(null);
  const activePostRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleCommand = (transcript) => {
    const command = normalizeCommand(transcript);
    setLastCommand(transcript);

    const visiblePost = getVisiblePost();
    const activePost = activePostRef.current || visiblePost;
    const currentPost = getPostDetails(activePost);
    const currentItem = getPageItemDetails(activePage);

    if (currentPost) {
      activePostRef.current = activePost;
    }

    setStatusMessage(`Heard: ${transcript}`);

    const pageCommands = [
      { page: "Home", phrases: ["go home", "open home", "home page"] },
      { page: "Search", phrases: ["go to search", "open search", "search page", "explore page"] },
      { page: "Reels", phrases: ["go to reels", "open reels", "reels page"] },
      { page: "Shop", phrases: ["go to shop", "open shop", "shop page"] },
      { page: "Profile", phrases: ["go to profile", "open profile", "profile page"] },
    ];

    const matchedPage = pageCommands.find(({ phrases }) => matchesAny(command, phrases));

    if (matchedPage) {
      activePostRef.current = null;
      onNavigate?.(matchedPage.page);
      announce(`Opening ${matchedPage.page}.`);
      return;
    }

    if (matchesAny(command, ["where am i", "what page is this", "current page"])) {
      announce(`You are on the ${activePage} page.`);
      return;
    }

    if (activePage === "Home" && matchesAny(command, ["like", "like post", "like this post"])) {
      const liked = triggerClick([
        'button[aria-label="Like post"]',
        'button[aria-label*="Like"]',
      ]);

      announce(liked ? "Liked the current post." : "I could not find a like button.");
      return;
    }

    if (activePage === "Home" && matchesAny(command, ["comment", "open comments", "show comments"])) {
      const opened = triggerClick([
        'button[aria-label="Comment"]',
        'button[aria-label*="Comment"]',
      ]);

      announce(opened ? "Opened comments." : "I could not find a comment button.");
      return;
    }

    if (
      activePage === "Home" &&
      (matchesAny(command, [
        "what is this post about",
        "explain this post",
        "tell me about this post",
        "what does this post say",
        "explain the post",
        "explain it",
      ]) ||
        (activePostRef.current &&
          matchesAny(command, ["explain", "explanation", "what about this"])))
    ) {
      if (!currentPost) {
        announce("I could not find a post to explain right now.");
        return;
      }

      activePostRef.current = activePost;
      speak(
        `${currentPost.user} posted this. ${currentPost.caption} The image shows ${currentPost.altText}.`,
        { force: true }
      );
      return;
    }

    if (
      activePage === "Home" &&
      (matchesAny(command, [
        "read the caption",
        "what is the caption",
        "say the caption",
        "read caption",
      ]) ||
        (activePostRef.current && matchesAny(command, ["caption", "what is written", "read it"])))
    ) {
      if (!currentPost?.caption) {
        announce("I could not find a caption for this post.");
        return;
      }

      activePostRef.current = activePost;
      speak(`Caption: ${currentPost.caption}`, { force: true });
      return;
    }

    if (
      activePage === "Home" &&
      (matchesAny(command, [
        "describe this post",
        "describe the image",
        "what is in this image",
        "describe this post image",
        "describe image",
      ]) ||
        (activePostRef.current && matchesAny(command, ["describe image", "what is in it"])))
    ) {
      if (!currentPost?.altText) {
        announce("I could not find an image description for this post.");
        return;
      }

      activePostRef.current = activePost;
      speak(`This image shows ${currentPost.altText}.`, { force: true });
      return;
    }

    if (
      activePage === "Home" &&
      (matchesAny(command, [
        "who posted this",
        "who is the user",
        "whose post is this",
        "who posted it",
      ]) ||
        (activePostRef.current && matchesAny(command, ["who is this", "who is it by"])))
    ) {
      if (!currentPost?.user) {
        announce("I could not identify the creator of this post.");
        return;
      }

      activePostRef.current = activePost;
      speak(`This post was shared by ${currentPost.user}.`, { force: true });
      return;
    }

    if (
      activePage === "Home" &&
      (matchesAny(command, ["summarize this post", "summarize post", "summary of this post"]) ||
        (activePostRef.current && matchesAny(command, ["summarize", "summary"])))
    ) {
      if (!currentPost) {
        announce("I could not find a post to summarize.");
        return;
      }

      activePostRef.current = activePost;
      speak(
        `Summary: ${currentPost.user} shares a post about ${currentPost.altText}. The caption says, ${currentPost.caption}`,
        { force: true }
      );
      return;
    }

    if (
      activePage === "Home" &&
      (matchesAny(command, ["read comments", "show comments", "tell me the comments"]) ||
        (activePostRef.current && matchesAny(command, ["comments", "comment list"])))
    ) {
      const comments = currentPost?.comments?.filter(Boolean) || [];

      if (!comments.length) {
        announce("I could not find comments for this post.");
        return;
      }

      activePostRef.current = activePost;
      speak(`Top comments: ${comments.join(". ")}`, { force: true });
      return;
    }

    if (
      activePage === "Home" &&
      (matchesAny(command, ["what are the hashtags", "read hashtags", "tell me the hashtags"]) ||
        (activePostRef.current && matchesAny(command, ["hashtags", "tags"])))
    ) {
      const hashtags = currentPost?.hashtags?.filter(Boolean) || [];

      if (!hashtags.length) {
        announce("There are no hashtags on this post.");
        return;
      }

      activePostRef.current = activePost;
      speak(`Hashtags: ${hashtags.join(", ")}`, { force: true });
      return;
    }

    if (
      activePage === "Home" &&
      (command.includes("answer follow up questions about this post") ||
        command.includes("follow up mode") ||
        command.includes("stay on this post"))
    ) {
      if (!visiblePost || !currentPost) {
        announce("I could not lock onto a post for follow-up questions.");
        return;
      }

      activePostRef.current = visiblePost;
      speak(
        `Follow-up mode is on for ${currentPost.user}'s post. You can now ask about the caption, comments, hashtags, or image.`,
        { force: true }
      );
      return;
    }

    if (
      activePage === "Home" &&
      activePostRef.current &&
      matchesAny(command, [
        "what does it mean",
        "tell me more",
        "what is the meaning",
        "explain more",
        "more",
        "meaning",
      ])
    ) {
      if (!currentPost) {
        announce("I lost track of the active post.");
        return;
      }

      speak(
        `${currentPost.user}'s post is mainly about ${currentPost.altText}. The caption adds this message: ${currentPost.caption}`,
        { force: true }
      );
      return;
    }

    if (
      (activePage === "Search" || activePage === "Shop") &&
      matchesAny(command, [
        "describe this",
        "describe this page",
        "tell me about this",
        "what am i looking at",
        "describe this post",
      ])
    ) {
      if (!currentItem) {
        announce(`I could not find details for the ${activePage} page right now.`);
        return;
      }

      speak(
        `${currentItem.user}'s discover post. ${currentItem.caption} The image shows ${currentItem.altText}.`,
        { force: true }
      );
      return;
    }

    if (
      (activePage === "Search" || activePage === "Shop") &&
      matchesAny(command, [
        "read suggestions",
        "read categories",
        "what can i search",
        "search suggestions",
      ])
    ) {
      const suggestions = Array.from(document.querySelectorAll("[data-search-suggestion]"))
        .map((element) => element.textContent?.trim())
        .filter(Boolean);

      if (!suggestions.length) {
        announce("I could not find any search suggestions.");
        return;
      }

      speak(`Suggestions: ${suggestions.join(", ")}.`, { force: true });
      return;
    }

    if (
      activePage === "Reels" &&
      matchesAny(command, [
        "describe this",
        "describe this reel",
        "read this reel",
        "what is this reel about",
      ])
    ) {
      if (!currentItem || currentItem.type !== "reel") {
        announce("I could not find a reel to describe.");
        return;
      }

      speak(
        `${currentItem.user}'s reel. ${currentItem.caption} This reel shows ${currentItem.altText}.`,
        { force: true }
      );
      return;
    }

    if (
      activePage === "Profile" &&
      matchesAny(command, [
        "describe this",
        "read profile",
        "profile summary",
        "who is this profile",
        "tell me about this profile",
      ])
    ) {
      if (!currentItem || currentItem.type !== "profile") {
        announce("I could not read the profile details right now.");
        return;
      }

      speakProfileSummary(currentItem, speak);
      return;
    }

    if (
      activePage === "Profile" &&
      matchesAny(command, ["edit profile", "share profile"])
    ) {
      const opened = command.includes("share")
        ? triggerClick(['button[aria-label="Share Profile"]'])
        : triggerClick(['button[aria-label="Edit Profile"]']);

      announce(opened ? "Activated profile action." : "I could not find that profile action.");
      return;
    }

    if (matchesAny(command, ["next", "next post", "go next"])) {
      scrollWithinMain("down");
      activePostRef.current = null;
      announce(activePage === "Home" ? "Moved to the next post." : `Moved down the ${activePage} page.`);
      return;
    }

    if (matchesAny(command, ["previous", "previous post", "back", "go back"])) {
      scrollWithinMain("up");
      activePostRef.current = null;
      announce(activePage === "Home" ? "Moved to the previous post." : `Moved up the ${activePage} page.`);
      return;
    }

    if (matchesAny(command, ["top", "go to top", "back to top"])) {
      scrollToTop();
      activePostRef.current = null;
      announce(activePage === "Home" ? "Returned to the top of the feed." : `Returned to the top of ${activePage}.`);
      return;
    }

    announce(`I heard "${transcript}", but I do not know that command yet.`);
  };

  const startListening = () => {
    const SpeechRecognition = getSpeechRecognition();

    if (!SpeechRecognition) {
      const message = "Speech recognition is not supported in this browser.";
      setErrorMessage(message);
      setStatusMessage(message);
      announce(message);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    setErrorMessage("");
    setStatusMessage("Listening... Speak now.");
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setErrorMessage("");
      setStatusMessage("Listening... Speak now.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        handleCommand(transcript);
      }
    };

    recognition.onerror = (event) => {
      const message =
        event.error === "not-allowed"
          ? "Microphone access was blocked."
          : event.error === "no-speech"
            ? "I did not hear anything. Try again and speak right after tapping the mic."
            : event.error === "audio-capture"
              ? "No microphone was detected."
              : "Voice recognition could not understand that.";

      setErrorMessage(message);
      setStatusMessage(message);
      speak(message, { force: true });
    };

    recognition.onnomatch = () => {
      const message = "I heard something, but I could not match it to a command.";
      setErrorMessage(message);
      setStatusMessage(message);
      speak(message, { force: true });
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      if (!lastCommand && !errorMessage) {
        setStatusMessage(
          activePage === "Home"
            ? "Tap the mic and ask about the current post."
            : `Tap the mic and ask about the ${activePage} page.`
        );
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      <button
        onClick={startListening}
        aria-label={isListening ? "Stop Voice Command" : "Start Voice Command"}
        aria-pressed={isListening}
        className={`text-white p-5 rounded-full shadow-lg transition-transform border-4 border-white ${
          isListening
            ? "bg-pink-700 scale-110"
            : "bg-pink-600 hover:scale-110 active:bg-pink-800"
        }`}
      >
        <MicIcon />
      </button>

      {(statusMessage || lastCommand || errorMessage) && (
        <div className="max-w-xs rounded-md bg-white/95 px-3 py-2 text-sm text-zinc-800 shadow-md border border-zinc-200">
          {statusMessage || errorMessage || `Heard: ${lastCommand}`}
        </div>
      )}
    </div>
  );
}
