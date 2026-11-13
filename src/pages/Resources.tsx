import { useState } from "react";
import { Link } from "react-router-dom";
import SubscribeForm from "../components/SubscribeForm";
import { posts, formatContentDate, type PostType } from "../lib/content";

const categories = [
  "All Resources",
  "Faith & Spirit",
  "Professional Skills",
  "Mental Wellness",
  "Community Action",
];

const typeIcons: Record<PostType, string> = {
  Guide: "menu_book",
  Article: "article",
  Video: "play_circle",
};

const typeBadgeClasses: Record<PostType, string> = {
  Guide: "bg-secondary text-on-secondary",
  Article: "bg-secondary-container text-on-secondary-container",
  Video: "bg-tertiary text-on-tertiary",
};

export default function Resources() {
  const [activeCat, setActiveCat] = useState("All Resources");

  const filtered =
    activeCat === "All Resources"
      ? posts
      : posts.filter((p) => p.category === activeCat);

  const featured = posts.find((p) => p.featured);

  return (
    <main className="pt-18 pb-xl">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-gutter pb-16 pt-24">
        <div className="absolute inset-0 geometric-pattern opacity-[0.07]" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-container-max text-center">
          <h1 className="mb-md font-display-lg text-display-lg-mobile text-secondary-fixed md:text-display-lg">
            Empowerment Resources
          </h1>
          <p className="mx-auto mb-lg max-w-2xl font-body-lg text-body-lg text-on-primary/70">
            Discover a curated library of guides, articles, and videos designed
            to fuel your spiritual, professional, and personal growth.
          </p>
        </div>

        {/* Filters */}
        <div className="relative z-10 mx-auto mb-lg max-w-container-max px-gutter">
          <div className="flex flex-wrap items-center gap-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={
                  activeCat === cat
                    ? "rounded-full bg-secondary-container px-6 py-2 font-button text-button text-on-secondary-container shadow-gold"
                    : "rounded-full border border-white/15 bg-white/5 px-6 py-2 font-button text-button text-on-primary/75 transition-colors hover:bg-white/10 hover:text-on-primary"
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
        <section className="mx-auto mb-xl max-w-container-max px-gutter">
          <Link
            to={`/resources/${featured.slug}`}
            className="card card-hover group flex flex-col overflow-hidden md:flex-row"
          >
            <div className="relative flex min-h-75 items-end overflow-hidden bg-primary md:w-1/2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,209,138,0.22),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(159,210,189,0.2),transparent_50%)]" />
              <span className="material-symbols-outlined absolute -right-4 -top-6 text-[160px] text-on-primary/10">
                {typeIcons[featured.type]}
              </span>
              <div className="relative z-10 p-lg">
                <div className="mb-md flex flex-wrap items-center gap-xs">
                  <span className="chip bg-secondary-container text-on-secondary-container shadow-sm">
                    Featured {featured.type}
                  </span>
                  <span className="chip bg-on-primary/10 text-on-primary backdrop-blur-sm">
                    {featured.category}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-primary">
                  {featured.title}
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center p-lg md:w-1/2 md:p-xl">
              <p className="mb-md font-body-md text-body-md leading-relaxed text-on-surface-variant">
                {featured.excerpt}
              </p>
              <div className="mb-lg flex flex-wrap items-center gap-sm text-body-sm text-on-surface-variant">
                <span>By {featured.author}</span>
                <span className="h-1 w-1 rounded-full bg-outline" />
                <span>{formatContentDate(featured.date)}</span>
              </div>
              <div className="flex items-center gap-md">
                <span className="btn btn-primary">
                  {featured.type === "Video"
                    ? "Watch Now"
                    : `Read ${featured.type}`}{" "}
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
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
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
          {filtered
            .filter((p) => !p.featured)
            .map((post) => (
              <Link
                key={post.slug}
                to={`/resources/${post.slug}`}
                className="card card-hover group flex flex-col overflow-hidden"
              >
                <div className="relative flex aspect-video items-end overflow-hidden bg-primary">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,209,138,0.18),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(159,210,189,0.18),transparent_50%)]" />
                  <span className="material-symbols-outlined absolute -right-3 -top-5 text-[120px] text-on-primary/10">
                    {typeIcons[post.type]}
                  </span>
                  <div className="relative z-10 w-full p-md">
                    <div className="mb-sm flex flex-wrap items-center gap-xs">
                      <span
                        className={`chip ${typeBadgeClasses[post.type]}`}
                      >
                        {post.type}
                      </span>
                      <span className="chip bg-on-primary/10 text-on-primary backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="line-clamp-3 font-headline-sm text-headline-sm text-on-primary">
                      {post.title}
                    </h3>
                  </div>
                </div>
                <div className="flex grow flex-col p-md">
                  <p className="mb-lg line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-outline-variant pt-md">
                    <span className="flex items-center gap-1 font-button text-button text-primary">
                      {post.type === "Video"
                        ? "Watch Now"
                        : post.type === "Guide"
                          ? "Read Guide"
                          : "Learn More"}{" "}
                      <span className="material-symbols-outlined text-sm">
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
      <section className="mx-auto mt-xl max-w-container-max px-gutter">
        <div className="relative overflow-hidden rounded-3xl bg-primary-container p-lg md:p-xl">
          <div className="absolute inset-0 geometric-pattern opacity-[0.06]" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-lg md:flex-row">
            <div className="md:w-1/2">
              <h2 className="mb-sm font-headline-md text-headline-md text-on-primary">
                Stay Updated
              </h2>
              <p className="font-body-md text-body-md text-on-primary/70">
                Get the latest resources and event invitations delivered straight
                to your inbox weekly.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
