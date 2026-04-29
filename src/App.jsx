import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Stories from "./components/Stories";
import Feed from "./components/Feed";
import VoiceControlPanel from "./components/VoiceControlPanel";
import SearchPage from "./components/SearchPage";
import ReelsPage from "./components/ReelsPage";
import ProfilePage from "./components/ProfilePage";
import MessagesPage from "./components/MessagesPage";
import { AccessibilityProvider, useA11y } from "./context/AccessibilityContext";
import { MessagesProvider } from "./context/MessagesContext";
import { postsArr, storiesArr } from "./data/data";

function MainContent() {
  const { highContrast, textSize, announce } = useA11y();
  const [activePage, setActivePage] = useState("Home");

  useEffect(() => {
    announce(`${activePage} page loaded. Voice Assist is active.`);
  }, [activePage, announce]);

  const renderPage = () => {
    switch (activePage) {
      case "Search":
        return <SearchPage />;
      case "Reels":
        return <ReelsPage />;
      case "Profile":
        return <ProfilePage />;
      case "Messages":
        return <MessagesPage />;
      case "Shop":
        return <SearchPage />;
      default:
        return (
          <>
            <Stories stories={storiesArr} />
            <Feed posts={postsArr} />
          </>
        );
    }
  };

  return (
    <div
      className={`flex min-h-screen justify-center transition-all ${
        highContrast ? "bg-black" : "bg-zinc-50"
      }`}
    >
      <div
        style={{ fontSize: `${textSize}%` }}
        className={`w-full max-w-[480px] min-h-screen flex flex-col shadow-2xl relative
          ${highContrast ? "bg-black border-x-2 border-white" : "bg-white border-x border-zinc-200"}
        `}
      >
        <div className="bg-zinc-800 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Voice Assist Active
        </div>

        <Header activePage={activePage} onNavigate={setActivePage} />

        <main data-page-container="true" className="flex-grow overflow-y-auto scroll-smooth">
          {renderPage()}
        </main>

        <VoiceControlPanel activePage={activePage} onNavigate={setActivePage} />
        <Footer activePage={activePage} onNavigate={setActivePage} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <MessagesProvider>
        <MainContent />
      </MessagesProvider>
    </AccessibilityProvider>
  );
}
