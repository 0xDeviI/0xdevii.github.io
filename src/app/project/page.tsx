"use client";
import { getImgPath, getDataPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, ExternalLink, Home } from "lucide-react";
import Head from "next/head";

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
  url?: string;
}

// Create a separate component that uses useSearchParams
const ProjectContent = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState<Boolean>(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id") || "1";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch("/data/work-data.json");
        if (!res.ok) throw new Error("Failed to fetch work data");
        const json = await res.json();
        const items: any[] = json?.workData || [];

        // Try to find by slug first
        let item = items.find((it) => it.id == projectId);

        if (item) {
          const built: Project = {
            id: item.slug || String(item.title),
            name: item.title,
            featuredImage: item.image,
            gallery: item.gallery || [{ src: item.image, alt: item.title }],
            skills: item.skills || [],
            blocks: item.blocks,
            url: item.url
          };

          setProject(built);
        }
      } catch (error) {
        console.error(error);
        setProject(null);
      } finally {
        if (project === null) {
          setNotFound(true);
        }
      }
    };

    fetchProject();
    window.scrollTo(0, 0);
  }, [projectId]);

  const handleGalleryChange = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGalleryIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const nextGalleryImage = () => {
    const gallery = project?.gallery;
    if (gallery) {
      const nextIndex = (galleryIndex + 1) % gallery.length;
      handleGalleryChange(nextIndex);
    }
  };

  const prevGalleryImage = () => {
    const gallery = project?.gallery;
    if (gallery) {
      const prevIndex = galleryIndex === 0 ? gallery.length - 1 : galleryIndex - 1;
      handleGalleryChange(prevIndex);
    }
  };

  if (!project) {
    if (notFound) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-500 text-lg">Project Not Found</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={project.name} />
        <meta property="og:description" content="A Project Done by Armin Asefi" />
        {project.featuredImage && (
          <meta property="og:image" content={project.featuredImage} />
        )}
        <meta property="og:url" content="https://0xdevii.github.io" />
        <meta property="og:type" content="website" />
        <title>{project.name}</title>
      </Head>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm">
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </a>
                <span className="text-muted-foreground">/</span>
                <a href="/#latest-work" className="text-muted-foreground hover:text-primary transition-colors duration-200">Work</a>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium truncate max-w-[200px]">{project.name}</span>
              </nav>

              {/* Title Section */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                  {project.name}
                </h1>
                {project.url && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      Visit the project
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Featured Image with Overlay */}
              <div className="relative group">
                <div className="relative aspect-video md:aspect-[21/9] lg:aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                  <Image
                    src={getImgPath(project.featuredImage)}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Image Counter Badge */}
                {project.gallery && project.gallery.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {project.gallery.length} images
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Carousel */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-16 md:py-20 bg-white">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Project Gallery</h2>
                  <p className="text-gray-500 mt-2">
                    {galleryIndex + 1} of {project.gallery.length}
                  </p>
                </div>

                {/* Gallery Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevGalleryImage}
                    className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary/5 rounded-xl transition-all group"
                    aria-label="Previous image"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-700 group-hover:text-primary transition-colors"
                    >
                      <path
                        d="M15 19l-7-7 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextGalleryImage}
                    className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary/5 rounded-xl transition-all group"
                    aria-label="Next image"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-700 group-hover:text-primary transition-colors"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative">
                {/* Main Gallery Image */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl ring-1 ring-black/5 max-h-[80vh]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={getImgPath(project.gallery[galleryIndex].src)}
                      alt={project.gallery[galleryIndex].alt}
                      width={1200}
                      height={800}
                      className={`transition-all duration-500 w-full h-auto max-h-[80vh] object-contain ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                      style={{ width: '100%', height: 'auto', maxHeight: '80vh' }}
                    />

                    {/* Image Alt Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-lg font-medium">
                        {project.gallery[galleryIndex].alt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gallery Indicators */}
                {project.gallery.length > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {project.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleGalleryChange(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === galleryIndex
                          ? 'bg-primary w-8'
                          : 'bg-gray-300 hover:bg-gray-400 w-2'
                          }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {project.skills && project.skills.length > 0 && (
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Technologies Used</h2>
                <p className="text-gray-500 mt-2">Tools and technologies that powered this project</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {project.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative bg-white px-6 py-5 border border-gray-200 rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-base md:text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {skill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content Blocks */}
        {project.blocks && project.blocks.length > 0 && (
          <section className="py-16 md:py-20 bg-white">
            <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-16">
                {project.blocks.map((block, index) => (
                  <div
                    key={index}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {block.type === "header" && (
                      <div className="relative mb-8">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                          {block.content}
                        </h2>
                        <div className="mt-4 w-20 h-1 bg-primary rounded-full" />
                      </div>
                    )}

                    {block.type === "paragraph" && (
                      <div className="prose prose-lg max-w-none">
                        <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light">
                          {block.content}
                        </p>
                      </div>
                    )}

                    {block.type === "image" && block.src && (
                      <div className="relative group my-12">
                        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 bg-gray-100 max-h-[80vh]">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                              src={getImgPath(block.src)}
                              alt={block.alt || "Project image"}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full h-auto max-h-[80vh] object-contain transition-opacity duration-500"
                              style={{ width: '100%', height: 'auto', maxHeight: '80vh' }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          </div>
                        </div>
                        {block.alt && (
                          <p className="mt-3 text-sm text-gray-500 text-center italic">
                            {block.alt}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action / Navigation */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Interested in working together?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Let's discuss how I can help bring your next project to life
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="/"
                  className="group w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-300 hover:border-black rounded-xl transition-all font-semibold text-lg inline-flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to home
                </a>

                <a
                  href="/#latest-work"
                  className="group w-full sm:w-auto px-8 py-4 bg-primary text-white hover:bg-primary/90 rounded-xl transition-all font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                >
                  View More Projects
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Main component with Suspense boundary
const ProjectPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-lg">Loading project...</p>
          </div>
        </div>
      }
    >
      <ProjectContent />
    </Suspense>
  );
};

export default ProjectPage;