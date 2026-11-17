import Image from "next/image";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/theme-controls";
import { BUSINESS } from "@/lib/constants/business";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.8fr)]">
      <section className="theme-light relative hidden overflow-hidden bg-ink px-12 py-10 text-white lg:flex lg:flex-col">
        {/* Banner from public/brand/han-banner.png (source: img/Website banner).
            The panel (ink #091315) matches the banner background so it blends. */}
        <div className="relative z-10 my-auto w-full">
          <Image
            alt={BUSINESS.name}
            className="banner-fade h-auto w-full"
            height={1248}
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            src="/brand/han-banner.png"
            width={3280}
          />
          <p className="mx-auto mt-6 max-w-md text-center text-base leading-7 text-white/60">
            A secure workspace designed for the considered service and precise
            record-keeping behind {BUSINESS.name}.
          </p>
        </div>
        <p className="relative z-10 text-center text-xs tracking-wider text-white/35">
          {BUSINESS.name.toUpperCase()} · {BUSINESS.systemLabel.toUpperCase()}
        </p>
      </section>

      {/* Form side uses its own lighter green palette (.auth-form-panel in
          globals.css), so it reads as a separate panel next to the banner. */}
      <section className="auth-form-panel relative flex min-h-screen items-center justify-center border-l border-border bg-canvas px-5 py-10 text-ink sm:px-10">
        <ThemeToggle className="absolute right-5 top-5 sm:right-10" />
        <div className="w-full max-w-md pt-10 lg:pt-0">
          <div className="mb-10 lg:hidden">
            <Image
              alt={BUSINESS.name}
              className="h-auto w-full rounded-2xl"
              height={1248}
              priority
              sizes="(max-width: 448px) 100vw, 448px"
              src="/brand/han-banner.png"
              width={3280}
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-dark">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-ink">{title}</h1>
          <p className="mt-3 leading-7 text-muted">{description}</p>
          <div className="mt-8">{children}</div>
          {footer && (
            <div className="mt-7 border-t border-border pt-6 text-sm text-muted">
              {footer}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
