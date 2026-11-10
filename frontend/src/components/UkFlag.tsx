import { useId } from "react";

// Petit drapeau britannique (SVG : les emojis drapeaux ne s'affichent pas sous Windows)

export default function UkFlag() {
  const clipId = useId();
  return (
    <svg className="navFlag" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id={clipId}>
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
