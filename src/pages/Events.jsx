import { useState } from "react"
import SubscribeForm from "../components/SubscribeForm"

const events = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-jUxRJ-jmVQf4tFVucHtZHbG6Rydt4bke3ZWoYuL8dr3wYbdbY4HwRK1x1MDL_g8MxJM5ze9yRlKGRJQCpE_QG1eIosGfElnfJs_1SINdWVLd4_bnqWittrcwxr3AFtxHbN3cTPmSIYNjs-TcXxn8BZ7piaxxDQqIf_EKtfV_dif3fKlkkpvGomNBdh_XWIdmo8O4p0uuN7CL03I_NXiFIfpVIZ0tlYqVPO_ju7NhvoB8JmcBdesV9jI9WPT5cChgWV5A2Jqy2Wh8",
    category: "Educational",
    date: "Sept 24, 2024",
    time: "10:00 AM",
    title: "Leadership & Ethics Seminar",
    desc: "Join us for an inspiring session on developing ethical leadership skills rooted in spiritual values for the modern professional landscape.",
    location: "Main Community Hall, Central Hub",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW5xvn0cc3DgCVQg5bkF-Wi1CfkQS1UagvH6ty7hmRBIvFIQ7rsMEqdduYV8xhw6HRgBBIamWFFLiwqUVWvAhP__MQ_nuSWwgEzMaiHPxIbkRTwf50g-EfbpIgYwWAP0QhaF1Z4Yx0JNZaozFpNjKKCgcqVmKq_fnLO4g85Yq2DQFRbXBT8l4gI0U8frEgPl9ILdM9s2zv_UEwSd8Z_95fOKgFkOsQT6ayUfQLlb6hAbAjDE9j-gSNgx5ZFKyxIdBAxM1aSWRLN99c",
    category: "Social",
    date: "Oct 02, 2024",
    time: "6:30 PM",
    title: "Youth Networking BBQ",
    desc: "A relaxed evening of food, games, and conversation. Connect with peers from various backgrounds in an informal, friendly setting.",
    location: "Westside Park Pavilion",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLiwE-hlogQYChYrtc-oOGQYJ2PpMZUxgs4_xix-qqQ9knSg2xGW4FNy9Dy2uvie01vTu1iNcRSTmksFBSA8WRZ6Jxm0i5LjOiIXW0pJmlqSxsFuSwUnbMrUuII5kmH9o13hWoaiP6_kOnINMnlYbTduDelmy4GJDV6iXUO6dKDRKAvHXO-6EULBbqao0iZeZT7XC2UnwAuoJ_WdGCJ1_YCadNT4cz3Uzrs91ut1ZGPZsY8y5cQ5L5dxTbfrMaC4ENaBhHptl5mSE-",
    category: "Sports",
    date: "Oct 15, 2024",
    time: "9:00 AM",
    title: "Annual Soccer Tournament",
    desc: "Lace up your boots for a day of friendly competition. Teams of all skill levels are welcome. Prizes for the winning team!",
    location: "City Sports Complex, Arena B",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNH16vwhXGqaF1VAdBNpLF0kK7ikDFwh4s_UbcAMjSRdt5CYlZmFRz_-0Ygk-qKNMSf2HHXo1CCs0cLR49IPMzY2HXeOHMGGkXu3zS13EBLS8ojWFMO0fNdjsOYfA_4IV5BEnLUjj9gfEFCrK49hjXA4DfmcACs0xfgwAmgh1112UGtqQwW2hEooLe77--ck9vNO4uNag0azHcgoHEWwrT6qW4W24MRrHBSgEi9wAoXvwpc55E1Du3sw-jbOUUmfwFeJmr8i_mF2iR",
    category: "Spiritual",
    date: "Oct 22, 2024",
    time: "7:00 PM",
    title: "Reflections & Chai",
    desc: "An evening of spiritual storytelling and reflection accompanied by artisan chai. A chance to slow down and find inner peace.",
    location: "Noor Youth Lounge",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_lomlikiWb98gUcitbAjAH5DCKxtr6GgYVNeBg-6wPs6Uusd46LUtO5VYvs--lQTs28HeBM_-hzzNc824BSwMXHzJFFKmE4I9Hhj9-0jWjs2l-ZaWBAgmoddRF6vlw6JIvBOfRv9EPxvhiIRs222c1uum9es4Z29n9GmkaBJANRxhyIAVmUE-O-qOSDTCJWRbH9Cv9eewgKS8N2Uo5QY_OVckLIKWbwxM02VrpwdeADBvEwaO5wuOwAcEQUqUQmZRotGVd3U9n00f",
    category: "Educational",
    date: "Nov 05, 2024",
    time: "2:00 PM",
    title: "Tech for Social Good Workshop",
    desc: "Learn how to leverage modern technology and coding to solve real-world community problems in this hands-on workshop.",
    location: "Innovation Lab, 3rd Floor",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuZk5mgxsXwLg_nW2pjhNGHQUZslphTRkwD6Csi52ap6Pg1eb0Kdmac4wu4-K2GUWYK3JpsuTszkkNyaAexE1MlL-SVqUzwmWkFySLUDLci08WbA4DWsRPRIgOsVD1N7zd5ctUNJGyehqguF5yU_1wE8Q_m0ySJZYNQYmB3ZJjvQBhJW75zyoO34ewhKn9tRwv5yr-zdLdZDrHH8MAS45tSXjq2rBqIK6Vc31b74VHfZTHKZoFY69dGDCVAkiJsq16R4wWxsRoJzrv",
    category: "Sports",
    date: "Nov 12, 2024",
    time: "7:30 AM",
    title: "Sunrise Mountain Hike",
    desc: "Experience the majesty of nature on our guided sunrise hike. Moderate difficulty. Perfect for building stamina and bonding.",
    location: "North Ridge Trailhead",
  },
];

const categories = [
  "All Events",
  "Social",
  "Educational",
  "Spiritual",
  "Sports",
];

const categoryColors = {
  Educational: "bg-secondary-container text-on-secondary-container",
  Social: "bg-primary-fixed text-on-primary-fixed-variant",
  Sports: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Spiritual: "bg-secondary text-on-secondary",
};

const dotColors = {
  Educational: "bg-secondary-container",
  Social: "bg-primary-fixed",
  Sports: "bg-tertiary-fixed",
  Spiritual: "bg-secondary",
};

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [view, setView] = useState("grid");

  const filtered =
    activeCategory === "All Events"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <main className="pt-16">
      {/* Hero */}
      <header className="relative pt-32 pb-16 px-gutter bg-primary-container overflow-hidden">
        <div className="absolute inset-0 geometric-pattern" />
        <div className="relative z-10 max-w-container-max mx-auto text-center">
          <h1 className="font-display-lg text-display-lg text-on-primary mb-4">
            Upcoming Events & Workshops
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container/90 max-w-2xl mx-auto mb-lg">
            Discover opportunities to learn, connect, and grow. Join our vibrant
            community in activities designed for the next generation.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-md bg-surface/10 backdrop-blur-md p-md rounded-xl border border-white/10">
            <div className="hidden md:flex flex-wrap items-center gap-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    activeCategory === cat
                      ? "bg-secondary text-on-secondary font-button text-button px-5 py-2 rounded-full shadow-lg"
                      : "bg-white/10 text-on-primary hover:bg-white/20 font-button text-button px-5 py-2 rounded-full transition-all"
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="md:hidden w-full bg-surface/20 text-on-primary border border-white/20 rounded-lg px-4 py-2 font-button text-button outline-none focus:ring-2 focus:ring-secondary"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="text-on-surface bg-surface"
                >
                  {cat}
                </option>
              ))}
            </select>
            <div className="flex items-center bg-white/20 rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={
                  view === "grid"
                    ? "bg-white text-primary p-2 rounded shadow-sm flex items-center gap-2"
                    : "text-on-primary p-2 rounded hover:bg-white/10 flex items-center gap-2"
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20 }}
                >
                  grid_view
                </span>
                <span className="font-label-md text-label-md">Grid</span>
              </button>
              <button
                onClick={() => setView("calendar")}
                className={
                  view === "calendar"
                    ? "bg-white text-primary p-2 rounded shadow-sm flex items-center gap-2"
                    : "text-on-primary p-2 rounded hover:bg-white/10 flex items-center gap-2"
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20 }}
                >
                  timeline
                </span>
                <span className="font-label-md text-label-md">Timeline</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Grid View */}
      {view === "grid" && (
        <main
          className="py-xl px-gutter max-w-container-max mx-auto"
          id="event-grid"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {filtered.map((event) => (
              <div
                key={event.title}
                className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={event.title}
                    src={event.img}
                  />
                  <div
                    className={`absolute top-4 left-4 ${categoryColors[event.category]} px-3 py-1 rounded-full font-label-md text-label-md`}
                  >
                    {event.category}
                  </div>
                </div>
                <div className="p-md">
                  <div className="flex items-center gap-2 text-primary font-label-md text-label-md mb-2">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    <span>{event.date}</span>
                    <span className="mx-1 text-outline">&bull;</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">
                    {event.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm mb-lg">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    <span>{event.location}</span>
                  </div>
                  <button className="w-full font-button text-button bg-primary text-on-primary py-3 rounded-lg hover:bg-primary-container transition-all">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Timeline View */}
      {view === "calendar" && (
        <div className="py-xl px-gutter max-w-container-max mx-auto">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-xl">
            Event Timeline
          </h2>
          {filtered.length === 0 ? (
            <p className="text-on-surface-variant text-center py-xl">
              No events match this category.
            </p>
          ) : (
            <div className="relative">
              <div className="absolute left-4.75 top-0 bottom-0 w-0.5 bg-outline-variant" />
              <div className="space-y-lg">
                {filtered.map((event, i) => (
                  <div key={event.title} className="relative pl-14">
                    <div
                      className={`absolute left-3 top-6 w-3.5 h-3.5 rounded-full border-4 border-surface ${dotColors[event.category]} ring-2 ring-outline-variant`}
                    />
                    <div className="bg-white rounded-xl border border-outline-variant p-md shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-md">
                        <div className="md:w-1/4">
                          <div
                            className={`inline-block px-3 py-1 rounded-full font-label-md text-label-md mb-2 ${categoryColors[event.category]}`}
                          >
                            {event.category}
                          </div>
                          <div className="flex items-center gap-2 text-primary font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[18px]">
                              calendar_today
                            </span>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-label-md text-label-md mt-1">
                            <span className="material-symbols-outlined text-[18px]">
                              schedule
                            </span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                            {event.title}
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                            {event.desc}
                          </p>
                          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm mb-4">
                            <span className="material-symbols-outlined text-[18px]">
                              location_on
                            </span>
                            <span>{event.location}</span>
                          </div>
                          <button className="font-button text-button bg-primary text-on-primary py-2 px-6 rounded-lg hover:bg-primary-container transition-all">
                            Register Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <section className="bg-surface-container py-xl">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-md">
            Don't miss out on our community updates.
          </h2>
          <div className="max-w-128 mx-auto">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </main>
  );
}
