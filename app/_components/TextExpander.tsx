"use client";
import { ReactNode, useState } from "react";
import Logo from "./Logo";
type TextExpanderProps = {
  children: string;
  initialNumber: number;
};
export default function TextExpander({
  children,
  initialNumber,
}: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, initialNumber).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}
