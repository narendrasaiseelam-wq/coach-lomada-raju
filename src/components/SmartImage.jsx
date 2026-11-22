import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  aspectClass = "",
  objectPosition = "object-top",
  fit = "cover",
  label,
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const hasError = !src || failedSrc === src;

  const fileName = src ? src.split("/").pop() : "image.jpg";

  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-[#E2E2E5] border border-[#1C1C21]/12 flex flex-col items-center justify-center p-6 text-center select-none ${
          aspectClass || "aspect-[4/3]"
        } ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full border border-[#A67C52]/40 bg-[#EFEFEF] flex items-center justify-center mb-4">
          <ImageIcon className="w-5 h-5 text-[#B45309]" strokeWidth={1.6} />
        </div>

        <p className="font-editorial text-sm tracking-[0.14em] uppercase text-[#B45309] font-bold mb-1">
          {label || "Editorial Photograph"}
        </p>
        <p className="text-xs font-semibold text-[#1C1C21] tracking-wide mb-2">
          Place <span className="underline decoration-[#A67C52] underline-offset-4">{fileName}</span> in{" "}
          <span>public/images/</span>
        </p>
        {alt && (
          <p className="text-[11px] text-[#4A4A52] max-w-[240px] leading-relaxed">
            {alt}
          </p>
        )}
      </div>
    );
  }

  const imageFitClasses =
    fit === "contain"
      ? "w-full h-auto object-contain"
      : `w-full h-full object-cover ${objectPosition}`;

  return (
    <div
      className={`group relative overflow-hidden bg-[#E2E2E5] ${
        fit === "contain" ? "" : aspectClass
      } ${className}`}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setFailedSrc(src)}
        className={`${imageFitClasses} transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imgClassName}`}
      />
    </div>
  );
}
