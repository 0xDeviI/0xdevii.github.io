"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCourses(data?.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="relative py-10 md:py-32">
        <div className="container">
          <div className="flex flex-col gap-6 border-b border-black pb-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3">
                <span className="text-sm uppercase tracking-[0.35em] text-secondary">Teaching Journey</span>
                <span className="h-0.5 w-14 rounded-full bg-primary/80"></span>
              </div>
              <h2 className="mt-4">Courses</h2>
              <p className="mt-4 text-sm text-secondary max-w-xl">
                List of the courses that I held. These are available on YT and Maktabkhooneh, all free of charge!
              </p>
            </div>
            <p className="text-xl text-primary">( 05 )</p>
          </div>

          <div className="pt-10 xl:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {courses?.map((course: any, idx: number) => (
                <article
                  key={idx}
                  className="group overflow-hidden rounded-[2rem] border border-softGray bg-gradient-to-br from-white to-slate-50 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_-30px_rgba(15,23,42,0.35)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImgPath(course.image)}
                      alt={course.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/20 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h5 className="text-xl font-semibold text-slate-900">{course.title}</h5>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {course.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-700"></span>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-black"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
