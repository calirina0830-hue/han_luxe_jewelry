import Image from "next/image";

import { BUSINESS } from "@/lib/constants/business";

type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
};

// Square logo from public/brand/han-logo.png (source: img/Website square).
export function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3" aria-label={BUSINESS.name}>
      <Image
        alt=""
        aria-hidden="true"
        className={
          "size-12 shrink-0 rounded-xl border " +
          (light ? "border-white/10" : "border-border")
        }
        height={96}
        priority
        src="/brand/han-logo.png"
        width={96}
      />
      {!compact && (
        <span className="leading-none">
          <span
            className={
              "block font-serif text-[1.35rem] tracking-[0.08em] " +
              (light ? "text-white" : "text-ink")
            }
          >
            {BUSINESS.shortName}
          </span>
          <span
            className={
              "mt-1 block whitespace-nowrap text-[0.52rem] font-semibold tracking-[0.12em] " +
              (light ? "text-gold-light" : "text-gold-dark")
            }
          >
            {BUSINESS.descriptor.toUpperCase()}
          </span>
        </span>
      )}
    </div>
  );
}
