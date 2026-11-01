import { useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SubscribeForm from "../components/SubscribeForm";
import LoginModal from "../components/LoginModal";
import posts from "../data/posts";

const categories = [
  "All Resources",
  "Faith & Spirit",
  "Professional Skills",
  "Mental Wellness",
  "Community Action",
];

export default function Resources() {
  const { user, isBookmarked, toggleBookmark } = useAuth();
  const { pathname } = useLocation();
  const [activeCat, setActiveCat] = useState("All Resources");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBookmark = (e: MouseEvent<HTMLButtonElement>, slug: string) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    toggleBookmark(slug);
  };

  const filtered =
    activeCat === "All Resources"
      ? posts
      : posts.filter((p) => p.category === activeCat);

  const featured = posts.find((p) => p.featured);

  return (
    <main className="pt-24 pb-xl">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-md mb-xl">
        <div className="relative z-10 px-2 mx-auto text-center max-w-container-max">
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-secondary-fixed-dim mb-md">
            Empowerment Resources
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-primary-container mb-lg">
            Discover a curated library of guides, articles, and videos designed
            to fuel your spiritual, professional, and personal growth.
          </p>
        </div>

        {/* Filters */}
        <div className="mx-auto max-w-container-max px-gutter mb-lg">
          <div className="flex flex-wrap items-center gap-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={
                  activeCat === cat
                    ? "bg-primary text-on-primary px-6 py-2 rounded-full font-button text-button"
                    : "bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-button text-button hover:bg-surface-variant transition-colors"
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="mx-auto max-w-container-max px-gutter mb-xl">
          <Link
            to={`/resources/${featured.slug}`}
            className="flex flex-col overflow-hidden transition-shadow duration-500 border shadow-md md:flex-row bg-surface-container-lowest rounded-xl border-outline-variant hover:shadow-xl"
          >
            <div className="relative md:w-1/2 min-h-75">
              <img
                className="absolute inset-0 object-cover w-full h-full"
                alt={featured.title}
                src={featured.image}
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1 rounded-full shadow-sm bg-secondary-container text-on-secondary-container font-label-md text-label-md">
                  Featured Guide
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center md:w-1/2 p-lg">
              <h2 className="font-headline-md text-headline-md text-primary mb-md">
                {featured.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-md">
                <span className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-on-primary font-button text-button group">
                  Read Guide{" "}
                  <span className="transition-transform material-symbols-outlined group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Resource Grid */}
      <section className="mx-auto max-w-container-max px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {filtered
            .filter((p) => !p.featured)
            .map((post) => (
              <Link
                key={post.slug}
                to={`/resources/${post.slug}`}
                className="flex flex-col overflow-hidden transition-all border rounded-lg bg-surface-container-lowest border-outline-variant hover:shadow-lg group"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    alt={post.title}
                    src={post.image}
                  />
                  <div className="absolute flex bottom-2 left-2 gap-xs">
                    <span
                      className={`px-3 py-1 rounded font-label-md text-label-md ${
                        post.type === "Video"
                          ? "bg-tertiary text-on-tertiary"
                          : "bg-secondary text-on-secondary"
                      }`}
                    >
                      {post.type}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleBookmark(e, post.slug)}
                    aria-label={
                      isBookmarked(post.slug) ? "Remove bookmark" : "Save post"
                    }
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center hover:bg-surface transition-all"
                  >
                    <span
                      className={`material-symbols-outlined text-sm ${isBookmarked(post.slug) ? "text-secondary-fixed-dim" : "text-on-surface-variant"}`}
                    >
                      {isBookmarked(post.slug) ? "bookmark" : "bookmark_border"}
                    </span>
                  </button>
                </div>
                <div className="flex flex-col p-md grow">
                  <span className="text-secondary font-label-md text-label-md mb-xs">
                    {post.category}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
                    {post.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto border-t pt-md border-outline-variant">
                    <span className="flex items-center gap-1 text-primary font-button text-button">
                      {post.type === "Video"
                        ? "Watch Now"
                        : post.type === "Guide"
                          ? "Read Guide"
                          : "Learn More"}{" "}
                      <span className="text-sm material-symbols-outlined">
                        {post.type === "Video"
                          ? "play_arrow"
                          : post.type === "Guide"
                            ? "description"
                            : "open_in_new"}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-container-max px-gutter mt-xl">
        <div className="flex flex-col items-center justify-between bg-surface-container-highest rounded-2xl p-lg md:flex-row gap-lg">
          <div className="md:w-1/2">
            <h2 className="font-headline-md text-headline-md text-primary mb-sm">
              Stay Updated
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Get the latest resources and event invitations delivered straight
              to your inbox weekly.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <SubscribeForm />
          </div>
        </div>
      </section>

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        from={pathname}
      />
    </main>
  );
}
