import { useState } from "react";
import { CalendarDays, ChevronDown, Clock, User } from "lucide-react";
import Button from "../../../components/ui/Button";
import { homeAsset } from "../../../lib/assets";
import { DONATION_PEOPLE, DONATION_TIMES, SITE } from "../content";

const FIELD =
  "h-14 w-full border border-white/10 bg-eerie-2 px-5 py-2.5 text-white outline-none transition-colors placeholder:text-inherit focus:border-gold";
const ICON_FIELD =
  "h-14 w-full cursor-pointer appearance-none border border-white/10 bg-eerie-2 py-2.5 pl-10 pr-8 text-white outline-none transition-colors focus:border-gold";

export default function Donation() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" aria-labelledby="donation-title" className="relative z-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="-mt-[270px] bg-smoky-2 lg:grid lg:grid-cols-[1fr_0.5fr]">
          <form
            className="px-5 py-10 sm:px-[60px] sm:py-[75px]"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <h2
              id="donation-title"
              className="text-center font-display text-headline-1 leading-[1.2]"
            >
              Donate a bite.
            </h2>

            <p className="mb-10 text-center">
              Help on{" "}
              <a href={SITE.supportPhoneHref} className="text-gold underline-offset-4 hover:underline">
                {SITE.supportPhone}
              </a>{" "}
              or fill out donation details.
            </p>

            <div className="grid gap-x-5 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Your name"
                aria-label="Your name"
                className={`${FIELD} mb-5`}
              />
              <input
                type="tel"
                name="phone"
                autoComplete="off"
                placeholder="Phone number"
                aria-label="Phone number"
                className={`${FIELD} mb-5`}
              />
            </div>

            <div className="grid gap-x-5 sm:grid-cols-3">
              <div className="relative mb-5">
                <User
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2"
                />
                <select name="people" className={ICON_FIELD} aria-label="Number of people">
                  {DONATION_PEOPLE.map((count) => (
                    <option key={count} value={`${count}-person`} className="bg-eerie-2">
                      {count} {count === 1 ? "person" : "people"}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                />
              </div>

              <div className="relative mb-5">
                <CalendarDays
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2"
                />
                <input
                  type="date"
                  name="donation-date"
                  aria-label="Donation date"
                  className={`${ICON_FIELD} uppercase [&::-webkit-calendar-picker-indicator]:opacity-0`}
                />
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                />
              </div>

              <div className="relative mb-5">
                <Clock
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2"
                />
                <select name="time" className={ICON_FIELD} aria-label="Pick-up time">
                  {DONATION_TIMES.map((time) => (
                    <option key={time} value={time} className="bg-eerie-2">
                      {time}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <textarea
              name="message"
              autoComplete="off"
              placeholder="Message"
              aria-label="Message"
              className={`${FIELD} mb-5 h-[140px] resize-none py-5 leading-none`}
            />

            <Button as="button" type="submit" variant="secondary" full>
              Fill a belly
            </Button>

            {sent && (
              <p role="status" className="mt-5 text-center text-gold">
                Thank you! We will reach out to arrange your donation.
              </p>
            )}
          </form>

          <div
            className="bg-smoky-1 bg-repeat px-5 py-10 text-center sm:px-[60px] sm:py-[75px]"
            style={{ backgroundImage: `url("${homeAsset("images/form-pattern.png")}")` }}
          >
            <h3 className="mb-10 font-display text-headline-1 leading-[1.2]">Contact us</h3>

            <p className="mb-[5px] font-bold">Share ideas !!</p>
            <a
              href={SITE.supportPhoneHref}
              className="block text-body-1 text-gold underline-offset-4 hover:underline"
            >
              {SITE.supportPhone}
            </a>

            <span
              aria-hidden="true"
              className="mx-auto my-5 block h-2 w-2 rotate-45 border border-gold"
            />

            <p className="mb-[5px] font-bold">Idea hub</p>
            <address className="mb-[25px] not-italic leading-[1.5] text-quick-silver">
              <a
                href="https://sevasadan.org/meal-donation"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:text-gold hover:underline"
              >
                sevasadan.org/meal-donation
              </a>
            </address>

            <p className="mb-[5px] font-bold">Delivery &amp; pick up</p>
            <p className="leading-[1.5] text-quick-silver">
              Monday to Sunday <br />
              9.00 am – 9.00 pm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
