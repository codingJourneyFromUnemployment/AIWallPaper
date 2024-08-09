import React from "react";

const Logo = ({ className = "", size = 100 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
    width={size}
    height={size}
  >
    <rect x="0" y="0" width="100" height="100" fill="white" />
    <path
      d="M20 80 Q50 20 80 80"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle
      cx="50"
      cy="50"
      r="25"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="6"
    />
    <circle cx="50" cy="50" r="5" fill="#7C3AED" />
    <path
      d="M35 70 L50 40 L65 70"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="6"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
