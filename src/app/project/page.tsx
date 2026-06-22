"use client";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ContentBlock {
  type: "header" | "paragraph" | "image";
  content?: string;
  src?: string;
  alt?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface Project {
  id: string;
  name: string;
  featuredImage: string;
  gallery?: GalleryImage[];
  skills: string[];
  blocks: ContentBlock[];
}

// Create a separate component that uses useSearchParams
const ProjectContent = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id") || "1";

  useEffect(() => {
    // Mock project data - replace with actual data fetching
    const mockProject: Project = {
      id: projectId,
      name: "GeekHub Educational Platform",
      featuredImage: "/images/courses/linux.jpg",
      gallery: [
        { src: "/images/work/geekub-1.jpg", alt: "GeekHub Dashboard" },
        { src: "/images/work/geekub-2.jpg", alt: "GeekHub Course View" },
        { src: "/images/work/geekub-3.jpg", alt: "GeekHub Player" },
      ],
      skills: ["React", "TypeScript", "Next.js", "Node.js", "MongoDB", "Docker", "AWS"],
      blocks: [
        {
          type: "header",
          content: "Project Overview",
          level: 2,
        },
        {
          type: "paragraph",
          content:
            "GeekHub is a comprehensive educational platform designed to provide high-quality programming courses and resources. The project was built as a full-stack solution with multiple panels for different user roles including students, instructors, and administrators.",
        },
        {
          type: "header",
          content: "Key Features",
          level: 2,
        },
        {
          type: "paragraph",
          content:
            "The platform includes a custom video player with end-to-end encryption, an admin panel for content management, an instructor panel for course creation and management, and a comprehensive student panel with progress tracking and interactive learning tools.",
        },
        {
          type: "image",
          src: "/images/work/geekub-feature.jpg",
          alt: "GeekHub Features",
        },
        {
          type: "header",
          content: "Technical Implementation",
          level: 2,
        },
        {
          type: "paragraph",
          content:
            "The project was implemented using multiple technologies and languages to ensure optimal performance and scalability. The backend was built with Node.js and Express, while the frontend utilized React and Next.js for server-side rendering and improved performance.",
        },
        {
          type: "header",
          content: "Challenges & Solutions",
          level: 2,
        },
        {
          type: "paragraph",
          content:
            "One of the main challenges was implementing a secure video player with end-to-end encryption while maintaining smooth playback. This was solved by implementing a custom player that uses AES-256 encryption for video content and JWT tokens for access control.",
        },
      ],
    };

    setProject(mockProject);
  }, [projectId]);

  const nextGalleryImage = () => {
    const gallery = project?.gallery;
    if (gallery) {
      setGalleryIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevGalleryImage = () => {
    const gallery = project?.gallery;
    if (gallery) {
      setGalleryIndex((prev) =>
        prev === 0 ? gallery.length - 1 : prev - 1
      );
    }
  };

  if (!project) {
    return <div className="py-32 text-center">Loading...</div>;
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold">
            {project.name}
          </h1>
          <div className="flex items-center gap-2">
          <div className="relative aspect-video md:aspect-auto md:h-96 lg:h-[500px] w-full overflow-hidden rounded-lg">
            <Image
              src={getImgPath(project.featuredImage)}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-5">
          <div className="container">
            <div className="flex items-center justify-between gap-2 pb-7 mb-12">
              <h3>Gallery</h3>
            </div>

            <div className="relative">
              <div className="relative aspect-video md:aspect-auto md:h-96 lg:h-[500px] w-full overflow-hidden rounded-lg">
                <Image
                  src={getImgPath(project.gallery[galleryIndex].src)}
                  alt={project.gallery[galleryIndex].alt}
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>

              {/* Gallery Controls */}
              <button
                onClick={prevGalleryImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 no-print"
                aria-label="Previous image"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 19l-7-7 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              <button
                onClick={nextGalleryImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 no-print"
                aria-label="Next image"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* Gallery Indicators */}
              <div className="flex justify-center gap-2 mt-6 no-print">
                {project.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === galleryIndex ? "bg-primary w-8" : "bg-gray-300"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section className="py-12 md:py-20 border-t border-softGray">
        <div className="container">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-12">
            <h2>Technologies Used</h2>
            <p className="text-xl text-primary">( {project.skills.length} )</p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {project.skills.map((skill, index) => (
              <div
                key={index}
                className="px-4 md:px-6 py-2.5 md:py-3.5 bg-white border border-softGray rounded-full text-base md:text-lg font-normal hover:border-primary transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Blocks */}
      <section className="py-12 md:py-20 border-t border-softGray">
        <div className="container max-w-4xl">
          <div className="space-y-8 md:space-y-12">
            {project.blocks.map((block, index) => (
              <div key={index}>
                {block.type === "header" && (
                  <h2 className="mb-6 text-2xl md:text-3xl font-bold">
                    {block.content}
                  </h2>
                )}

                {block.type === "paragraph" && (
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    {block.content}
                  </p>
                )}

                {block.type === "image" && block.src && (
                  <div className="relative aspect-video md:aspect-auto md:h-96 w-full overflow-hidden rounded-lg my-8">
                    <Image
                      src={getImgPath(block.src)}
                      alt={block.alt || "Project image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action / Navigation */}
      <section className="py-12 md:py-20 border-t border-softGray">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a
              href="/"
              className="px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-black hover:bg-black hover:text-white transition-all font-semibold text-lg rounded"
            >
              Back to Home
            </a>
            <a
              href="/#latest-work"
              className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white hover:bg-orange-600 transition-all font-semibold text-lg rounded"
            >
              View More Projects
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

// Main component with Suspense boundary
const ProjectPage = () => {
  return (
    <Suspense fallback={<div className="py-32 text-center">Loading...</div>}>
      <ProjectContent />
    </Suspense>
  );
};

export default ProjectPage;