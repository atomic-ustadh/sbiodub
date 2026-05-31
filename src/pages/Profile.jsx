import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import posts from "../data/posts";

const tabs = [
  "Edit Profile",
  "Bookmarks",
  "My Events",
  "Donations",
  "Payment Methods",
];

export default function Profile() {
  const {
    user,
    updateProfile,
    bookmarks,
    rsvps,
    cancelRsvp,
    donations,
    cards,
    addCard,
    removeCard,
    logout,
  } = useAuth();
  const [tab, setTab] = useState("Edit Profile");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [interests, setInterests] = useState(user?.interests || []);
  const interestOptions = [
    "Spiritual Growth",
    "Community Service",
    "Sports & Recreation",
    "Education & Mentorship",
    "Arts & Culture",
    "Leadership Development",
    "Social Events",
    "Volunteering",
  ];
  const [saved, setSaved] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleSaveProfile = () => {
    updateProfile({ name, phone, interests });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddCard = () => {
    if (!cardNum || !cardName || !cardExpiry || !cardCvv) return;
    addCard({
      last4: cardNum.slice(-4),
      brand: cardNum.startsWith("4") ? "Visa" : "Mastercard",
      name: cardName,
      expiry: cardExpiry,
    });
    setCardNum("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
    setShowCardForm(false);
  };

  const bookmarkedPosts = posts.filter((p) => bookmarks.includes(p.slug));

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen px-gutter">
        <div className="text-center space-y-md">
          <h1 className="font-headline-md text-headline-md text-primary">
            Please log in
          </h1>
          <Link
            to="/login"
            className="inline-block rounded-lg bg-primary text-on-primary px-lg py-md font-button"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

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
            onClick={() => logout()}
            className="ml-auto font-button text-button px-md py-sm rounded-t-lg text-error hover:opacity-80 transition-all"
          >
            Log Out
          </button>
        </div>

        {/* Tab Content */}
        <div className="border bg-surface-container-lowest border-outline-variant rounded-xl p-lg min-h-96">
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
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface-variant mb-sm">
                  Interests
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {interestOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 px-4 py-4 border rounded-xl cursor-pointer transition-all ${
                        interests.includes(opt)
                          ? 'border-secondary bg-secondary-fixed/10'
                          : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={interests.includes(opt)}
                        onChange={() =>
                          setInterests((prev) =>
                            prev.includes(opt)
                              ? prev.filter((i) => i !== opt)
                              : [...prev, opt],
                          )
                        }
                        className="w-5 h-5 rounded accent-secondary shrink-0"
                      />
                      <span className="font-body-md text-body-md text-on-surface">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={handleSaveProfile}
                className="w-40 transition-all rounded-lg bg-primary text-on-primary font-button text-button px-md py-sm hover:opacity-90"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {tab === "Bookmarks" && (
            <div>
              {bookmarkedPosts.length === 0 ? (
                <p className="text-on-surface-variant font-body-md">
                  No bookmarked resources yet.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
                  {bookmarkedPosts.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/resources/${p.slug}`}
                      className="overflow-hidden transition-all border rounded-lg border-outline-variant hover:shadow-lg bg-surface-container-lowest group"
                    >
                      <div className="overflow-hidden aspect-video">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-md">
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                          {p.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                          {p.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
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
                          {event.date} &middot; {event.time}
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
            <div>
              {donations.length === 0 ? (
                <p className="text-on-surface-variant font-body-md">
                  No donations yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant font-button text-button text-on-surface-variant">
                        <th className="pb-md pr-md">Date</th>
                        <th className="pb-md pr-md">Amount</th>
                        <th className="pb-md pr-md">Type</th>
                        <th className="pb-md pr-md">Allocation</th>
                        <th className="pb-md">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((d) => (
                        <tr
                          key={d.id}
                          className="border-b border-outline-variant/50"
                        >
                          <td className="py-md pr-md font-body-md text-on-surface">
                            {new Date(d.date).toLocaleDateString()}
                          </td>
                          <td className="py-md pr-md font-body-md text-on-surface">
                            &#8358;{d.amount.toLocaleString()}
                          </td>
                          <td className="py-md pr-md font-body-md text-on-surface-variant">
                            {d.type}
                          </td>
                          <td className="py-md pr-md font-body-md text-on-surface-variant">
                            {d.allocation}
                          </td>
                          <td className="py-md">
                            <Link
                              to={`/receipts?donation=${d.id}`}
                              className="text-primary font-button hover:underline"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <Link
                to="/receipts"
                className="inline-block mt-md text-primary font-button hover:underline"
              >
                View All Receipts &rarr;
              </Link>
            </div>
          )}

          {tab === "Payment Methods" && (
            <div>
              {cards.length > 0 && (
                <div className="space-y-md mb-lg">
                  {cards.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between border rounded-lg border-outline-variant p-md bg-surface-container-lowest"
                    >
                      <div className="flex items-center gap-md">
                        <span className="text-3xl material-symbols-outlined text-primary">
                          credit_card
                        </span>
                        <div>
                          <p className="font-button text-button text-on-surface">
                            {c.brand} **** {c.last4}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Expires {c.expiry}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCard(c.id)}
                        className="text-error font-button text-button hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {showCardForm ? (
                <div className="border rounded-lg max-w-auto space-y-md border-outline-variant p-md bg-surface-container-lowest">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNum}
                      onChange={(e) => setCardNum(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="px-4 py-3 border rounded-lg w-100 border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="px-4 py-3 border rounded-lg w-100 border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                        Expiry
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="px-4 py-3 border rounded-lg w-100 border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-sm">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="px-4 py-3 border rounded-lg w-100 border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:ring-2 focus:ring-secondary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-sm">
                    <button
                      onClick={handleAddCard}
                      className="transition-all rounded-lg bg-primary text-on-primary font-button text-button px-md py-sm hover:opacity-90"
                    >
                      Save Card
                    </button>
                    <button
                      onClick={() => setShowCardForm(false)}
                      className="text-on-surface-variant font-button text-button px-md py-sm hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCardForm(true)}
                  className="flex items-center gap-sm text-primary font-button hover:underline"
                >
                  <span className="material-symbols-outlined">add</span> Add
                  Payment Method
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
