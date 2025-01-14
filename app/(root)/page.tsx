import React from "react";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

const Home = () => {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latet Books"
        books={sampleBooks}
        containerClassname="mt-28"
      />
    </>
  );
};
export default Home;
