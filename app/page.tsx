"use client";

import { useEffect, useState } from "react";
import "./page.scss";

export default function Home() {
  const [contentHtml, setContentHtml] = useState({
    profile: "",
    personal: "",
    experience: "",
  });

  useEffect(() => {
    fetch("/api/cv")
      .then((response) => response.json())
      .then((data) => setContentHtml(data.html));
  }, []);

  return (
    <main className="w-full mt-4 px-4 container flex flex-col items-center">
      <section className="w-full h-screen" id="personal-information">
        <div
          className="w-full text-center flex flex-col justify-center items-center"
          dangerouslySetInnerHTML={{ __html: contentHtml.profile }}
        ></div>
        <div
          className="w-full px-32-md text-center"
          dangerouslySetInnerHTML={{ __html: contentHtml.personal }}
        ></div>
      </section>
      <section
        className="py-8 px-32-md mb-32"
        id="experience"
        dangerouslySetInnerHTML={{ __html: contentHtml.experience }}
      ></section>
    </main>
  );
}
