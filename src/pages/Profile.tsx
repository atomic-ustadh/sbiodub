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
    <main className="min-h-screen bg-surface-container-low pb-xl pt-18">
      <div className="mx-auto max-w-container-max px-gutter py-xl">
        <h1 className="mb-lg font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
          My Profile
        </h1>

        {/* Tabs */}
        <div className="mb-xl flex flex-wrap items-center gap-sm rounded-full border border-outline-variant/70 bg-surface-container-lowest p-1.5 shadow-card">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-md py-sm font-button text-button transition-all ${
                tab === t
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
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
            className="ml-auto rounded-full px-md py-sm font-button text-button text-error transition-all hover:bg-error-container/60"
          >
            Log Out
          </button>
        </div>

        {/* Tab Content */}
        <div className="card min-h-96 p-md md:p-lg">
          {tab === "Edit Profile" && (
            <div className="max-w-2xl space-y-lg">
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field py-4 text-lg"
                />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="field cursor-not-allowed bg-surface-container-low py-4 text-lg text-on-surface-variant"
                />
              </div>
              <div>
                <label className="mb-sm block font-label-md text-label-md uppercase text-on-surface-variant">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="080 1234 5678"
                  className="field py-4 text-lg"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="btn btn-primary w-40"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {tab === "My Events" && (
            <div>
              {rsvps.length === 0 ? (
                <p className="font-body-md text-on-surface-variant">
                  You haven't RSVP'd to any events yet.
                </p>
              ) : (
                <div className="space-y-md">
                  {rsvps.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col gap-sm rounded-2xl border border-outline-variant bg-surface-container-low p-md sm:flex-row sm:items-center sm:justify-between"
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
                        className="rounded-full px-sm py-xs font-button text-button text-error transition-colors hover:bg-error-container/60"
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
            <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-lg text-center">
              <div className="mx-auto mb-md flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-fixed">
                <span className="material-symbols-outlined text-3xl text-primary">
                  volunteer_activism
                </span>
              </div>
              <h2 className="mb-sm font-headline-sm text-headline-sm text-primary">
                Donation &amp; Payment History
              </h2>
              <p className="mx-auto mb-lg max-w-2xl font-body-md text-body-md text-on-surface-variant">
                See every verified donation and payment on your account in one
                place.
              </p>
              <Link
                to="/history"
                className="btn btn-primary"
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
