"use client";
import React, { useEffect } from "react";

import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await db.select().from(users);
        console.log(JSON.stringify(result, null, 2));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};
export default Home;
