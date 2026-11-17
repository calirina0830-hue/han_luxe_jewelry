"use client";

export function PrintInvoiceButton({
  label = "Print Invoice",
}: {
  label?: string;
}) {
  return (
    <button
      data-print-hide
      className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-on-primary hover:bg-primary-hover"
      onClick={() => window.print()}
      type="button"
    >
      {label}
    </button>
  );
}
