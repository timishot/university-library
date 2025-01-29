import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "@/components/BookCoverSvg";
type BookCoverVariant = "extraSmall" | "Small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  Small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400*600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div className="left-12% absolute z-10 h-[88%] w-[87.5%] sm:left-6 sm:w-full">
        <Image
          src={coverImage}
          alt="Book Cover"
          fill={true}
          className="rounded-sm object-fill"
          priority={true} // If this is a key image, prioritize loading
        />
      </div>
    </div>
  );
};
export default BookCover;
