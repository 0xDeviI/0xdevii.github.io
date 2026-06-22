import React from 'react';

const ExperienceSec = () => {
    const experiences = [
        {
            year: "2021",
            title: "Android & Backend Developer",
            company: "AzmoonYar",
            type: "Fulltime",
            description: "I was responsible for implementing the Android application and the required backend for defining and holding online exams in the AzmoonYar team. Users with the teacher role could add different students to their user panel, and by creating an exam, the students could take the exams and view their results.",
            stillWorking: false,
            urls: null
        },
        {
            year: "2022",
            title: "Fullstack Developer",
            company: "GeekHub",
            type: "Fulltime",
            description: "I developed all of the GeekHub educational service. This project included various sections such as a admin panel, instructor panel, course panel, student panel, and a custom video player with E2E encryption, all of which were implemented using different languages and technologies.",
            stillWorking: false,
            urls: null
        },
        {
            year: "2023",
            title: "Android Developer",
            company: "SharjPay",
            type: "Fulltime",
            description: "The SharjPay project was a platform for managing building-related matters such as monthly maintenance fee payments, resident communication, conducting surveys, and more. In this project, I implemented the Android app, which was fully integrated with the server.",
            stillWorking: false,
            urls: null
        },
        {
            year: "2024",
            title: "Tech Lead",
            company: "Dizinet",
            type: "Fulltime",
            description: "I was the tech lead for the Roozmozd project at Dizinet. At Roozmozd, we developed a WordPress plugin that updated WooCommerce product prices based on exchange rate fluctuations within specified time intervals. Then, building on that plugin, we developed a license sales panel, as well as an Android and desktop app for store managers.",
            stillWorking: false,
            urls: null
        },
        {
            year: "2025",
            title: "Founder",
            company: "YadBarg",
            type: "Fulltime",
            description: "YadBarg is a cross-platform startup that offers cloud-based note storage and task management system powered by AI. YadBarg's mission is to help users write with quality while keeping things simple, and to leverage AI for managing their tasks. Users can translate their saved notes into 17 world languages, summarize long texts, chat with their notes and ask questions, or change the tone of their writings. They can also create shared workspaces and collaborate seamlessly with friends or team/organization members within those spaces.",
            stillWorking: true,
            urls: null
        },
        {
            year: "2026",
            title: "Tutor",
            company: "Maktabkhooneh & YouTube",
            type: "Part-time",
            description: "I have been tutoring students in programming and software development for several years on my yt channel. I provide personalized guidance and support to help students understand complex concepts, improve their coding skills, and achieve their learning goals. My tutoring sessions cover a wide range of topics, including web development, cybersecurity, mobile app development, algorithms, networking, data structures, and more.",
            stillWorking: true,
            urls: {
                "YoutTube": "https://www.youtube.com/@FreeYourMalloc",
            }
        },
    ];

    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                        <h2>Experience</h2>
                        <p className="text-xl text-primary">( 02 )</p>
                    </div>

                    <div className="space-y-7 md:space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative">
                                <div className="">
                                    <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                                    <h4 className="text-lg font-normal">{exp.title}</h4>
                                </div>

                                <div className=" relative">
                                    {index < experiences.length && (
                                        <div className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? 'h-40' : 'h-30'} bg-softGray`}></div>
                                    )}

                                    <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                                        <div className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${exp.stillWorking === true ? 'border-primary' : 'border-black'
                                            }`}>
                                            {exp.stillWorking === true && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pl-4 lg:pl-7">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl text-black font-normal">{exp.company}</span>
                                        </div>
                                        <p className="text-base font-normal">{exp.type}</p>
                                    </div>
                                    <div className="pl-4 lg:pl-7">
                                        {exp.urls && (
                                            <div className="flex flex-col items-left gap-2 mt-2">
                                                {Object.entries(exp.urls).map(([key, value]) => (
                                                    <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="text-primary text-base font-normal hover:underline">
                                                        {key}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pl-8 sm:pl-0">
                                    <p className="leading-relaxed text-base">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSec;