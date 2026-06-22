"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

const Certifications = () => {
    const [certs, setCerts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(getDataPath("/data/page-data.json"));
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setCerts(data?.educationData?.certifications || []);
            } catch (error) {
                console.error("Error fetching certifications:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section>
            <div className="relative bg-softGray py-10 md:py-32">
                <div className="container">
                    <div className="flex flex-col gap-6 border-b border-black pb-7 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-3">
                                <span className="text-sm uppercase tracking-[0.35em] text-secondary">Certified Work</span>
                                <span className="h-0.5 w-14 rounded-full bg-primary/80"></span>
                            </div>
                            <h2 className="mt-4">Certifications</h2>
                            <p className="mt-4 text-sm text-secondary max-w-xl">
                                Professional achievements, training completions, and awards that highlight my technical learning path.
                            </p>
                        </div>
                        <p className="text-xl text-primary">( 04 )</p>
                    </div>

                    <div className="pt-10 xl:pt-16 grid gap-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                            {certs?.map((cert: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="group overflow-hidden rounded-[2rem] border border-softGray bg-white/80 p-6 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_-30px_rgba(15,23,42,0.35)]"
                                >
                                    {cert?.image && (
                                        <div className="flex items-center justify-center overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                                            <div className="relative h-40 w-full">
                                                <Image
                                                    src={getImgPath(cert.image)}
                                                    alt={cert.title}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <div className="mx-auto mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                            Certificate
                                        </div>
                                        <h5 className="text-xl font-semibold text-slate-900">{cert?.title}</h5>
                                        <p className="mt-3 text-sm leading-6 text-slate-600">{cert?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;