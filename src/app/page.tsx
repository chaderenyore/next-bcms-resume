import React, from 'react';
import { bcms } from './bcms-client';
import { ResumeEntry, ResumeEntryMetaItem } from '../../bcms/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BCMSImage } from '@thebcms/components-react';

const pageTitle = 'Resume - My Simple Resume';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const HomePage: React.FC = async () => {
    const resume = (await bcms.entry.getAll('resume')) as ResumeEntry[];
    if (!resume) {
        return notFound();
    }

    const data = {
        meta: resume[0].meta.en as ResumeEntryMetaItem,
    };

    const imgObj = resume[0].meta.en?.profile_picture;

    return (
        <div className="w-8/12 mx-auto mt-6 bg-white px-20 py-12">
            <header className="flex flex-row justify-between mb-4">
                <section className="name">
                    <h1 className="font-bold text-3xl">{data.meta.name}</h1>
                    <h3 className="text-2xl">{data.meta.title}</h3>
                </section>
                <section className="profile-photo mr-24">
                    <BCMSImage
                        clientConfig={bcms.getConfig()}
                        media={imgObj}
                        className="object-cover rounded-2xl w-28"
                    />
                </section>
            </header>
            <main className="details flex justify-between gap-10">
                <section className="basis-[60%]">
                    <h4 className="uppercase text-[#73808D] text-sm tracking-widest mb-1">
                        Experience
                    </h4>
                    {data.meta.work_experience.map((experience, index) => {
                        return (
                            <div className="mb-6" key={index}>
                                <h1 className="font-bold mb-1">
                                    {experience.job_title}
                                </h1>
                                <h3 className="mb-1">
                                    {experience.enterprise_name}
                                </h3>
                                <h4 className="text-[#73808D] text-sm">
                                    {experience.work_duration}
                                </h4>
                                <p />
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: experience.work_description
                                            .nodes[0].value,
                                    }}
                                />
                            </div>
                        );
                    })}
                    <h4 className="uppercase text-[#73808D] text-sm tracking-widest mb-1">
                        Education
                    </h4>
                    {data.meta.education.map((degree, index) => {
                        return (
                            <div className="mb-6" key={index}>
                                <h1 className="font-bold mb-1">
                                    {degree.degree_name}
                                </h1>
                                <h3>{degree.school_name}</h3>
                                <h4 className="text-[#73808D] text-sm">
                                    {degree.duration_and_location}
                                </h4>
                            </div>
                        );
                    })}
                </section>
                <section className="text-[#73808D] basis-[30%]">
                    <div className="contact mb-4">
                        <p>{data.meta.contact_information.email}</p>
                        <p>{data.meta.contact_information.phone_number}</p>
                        <p>{data.meta.contact_information.location}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold">Industry Knowledge</h3>
                        {data.meta.industry_knowledge.map(
                            (knowledge, index) => {
                                return <p key={index}>{knowledge}</p>;
                            },
                        )}
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold">Tools & Technologies</h3>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: data.meta.tools_and_technologies
                                    .nodes[0].value,
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold">Other Skills</h3>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: data.meta.other_skills.nodes[0].value,
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold">Languages</h3>
                        {data.meta.languages.map((language, index) => {
                            return <p key={index}>{language}</p>;
                        })}
                    </div>
                    <div className="mb-4 flex flex-col">
                        <h3 className="font-bold">Social</h3>
                        {data.meta.social.map((social, index) => {
                            return (
                                <Link key={index} href={social}>
                                    {social}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
