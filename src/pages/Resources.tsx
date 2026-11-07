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
            <div className="relative flex items-end overflow-hidden md:w-1/2 min-h-75 bg-primary">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,214,91,0.2),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(149,211,186,0.22),transparent_45%)]" />
              <span className="absolute -right-4 -top-6 material-symbols-outlined text-[160px] text-on-primary/10">
                {typeIcons[featured.type]}
              </span>
              <div className="relative z-10 p-lg">
                <div className="flex flex-wrap items-center gap-xs mb-md">
                  <span className="px-4 py-1 rounded-full shadow-sm bg-secondary-container text-on-secondary-container font-label-md text-label-md">
                    Featured {featured.type}
                  </span>
                  <span className="px-4 py-1 rounded-full bg-on-primary/10 text-on-primary font-label-md text-label-md backdrop-blur-sm">
                    {featured.category}
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-primary">
                  {featured.title}
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center md:w-1/2 p-lg">
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-sm mb-lg text-body-sm text-on-surface-variant">
                <span>By {featured.author}</span>
                <span className="w-1 h-1 rounded-full bg-outline" />
                <span>{formatContentDate(featured.date)}</span>
              </div>
              <div className="flex items-center gap-md">
                <span className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-on-primary font-button text-button group">
                  {featured.type === "Video"
                    ? "Watch Now"
                    : `Read ${featured.type}`}{" "}
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
                <div className="relative flex items-end overflow-hidden aspect-video bg-primary">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,214,91,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(149,211,186,0.18),transparent_45%)]" />
                  <span className="absolute -right-3 -top-5 material-symbols-outlined text-[120px] text-on-primary/10">
                    {typeIcons[post.type]}
                  </span>
                  <div className="relative z-10 w-full p-md">
                    <div className="flex flex-wrap items-center gap-xs mb-sm">
                      <span
                        className={`px-3 py-1 rounded font-label-md text-label-md ${typeBadgeClasses[post.type]}`}
                      >
                        {post.type}
                      </span>
                      <span className="px-3 py-1 rounded bg-on-primary/10 text-on-primary font-label-md text-label-md backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-primary line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col p-md grow">
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
    </main>
  );
}
