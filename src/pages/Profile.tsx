import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatContentDate } from "../lib/content";

const tabs = [
  "Edit Profile",
  "My Events",
  "Donations",
];

export default function Profile() {
  const navigate = useNavigate();
  const {
    user,
    updateProfile,
    rsvps,
    cancelRsvp,
    logout,
  } = useAuth();
  const [tab, setTab] = useState("Edit Profile");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = () => {
    updateProfile({ name, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <main className="min-h-screen pt-24 pb-xl bg-surface-container-low">
      <div className="mx-auto max-w-container-max px-gutter">
        <h1 className="font-display-lg text-display-lg text-primary mb-lg">
          My Profile
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap border-b gap-sm mb-xl border-outline-variant pb-sm">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-button text-button px-md py-sm rounded-t-lg transition-all ${
                tab === t
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            className="ml-auto font-button text-button px-md py-sm rounded-t-lg text-error hover:opacity-80 transition-all"
          >
            Log Out
          </button>
        </div>

        {/* Tab Content */}
        <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-md md:p-lg min-h-96">
          {tab === "Edit Profile" && (
            <div className="max-w-2xl space-y-lg">
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface-variant mb-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 border rounded-xl text-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface-variant mb-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-5 py-4 border rounded-xl text-lg cursor-not-allowed border-outline-variant bg-surface-container-low text-on-surface-variant font-body-md"
                />
              </div>
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface-variant mb-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="080 1234 5678"
                  className="w-full px-5 py-4 border rounded-xl text-lg border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="w-40 transition-all rounded-lg bg-primary text-on-primary font-button text-button px-md py-sm hover:opacity-90"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {tab === "My Events" && (
            <div>
              {rsvps.length === 0 ? (
                <p className="text-on-surface-variant font-body-md">
                  You haven't RSVP'd to any events yet.
                </p>
              ) : (
                <div className="space-y-md">
                  {rsvps.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between border rounded-lg border-outline-variant p-md bg-surface-container-lowest"
                    >
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-primary">
                          {event.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {formatContentDate(event.date)} &middot; {event.time}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {event.location}
                        </p>
                      </div>
                      <button
                        onClick={() => cancelRsvp(event.id)}
                        className="text-error font-button text-button hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "Donations" && (
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg text-center">
              <div className="mx-auto mb-md flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed">
                <span className="material-symbols-outlined text-3xl text-primary">
                  volunteer_activism
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">
                Donation &amp; Payment History
              </h2>
              <p className="mx-auto max-w-2xl font-body-md text-body-md text-on-surface-variant mb-lg">
                See every verified donation and payment on your account in one
                place.
              </p>
              <Link
                to="/history"
                className="inline-flex items-center gap-sm rounded-lg bg-primary px-md py-md font-button text-button text-on-primary transition-all hover:bg-primary-container active:scale-[0.98]"
              >
                View history
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
