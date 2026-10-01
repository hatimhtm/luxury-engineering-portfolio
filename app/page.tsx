import Hero from "@/components/v2/Hero";
import FilmChapter from "@/components/v2/FilmChapter";
import CaseStudies from "@/components/v2/CaseStudies";
import WorkIndex from "@/components/v2/WorkIndex";
import About from "@/components/v2/About";
import ContactBand from "@/components/v2/ContactBand";

export default function Home() {
    return (
        <>
            <Hero />
            <FilmChapter />
            <CaseStudies />
            <WorkIndex />
            <About />
            <ContactBand />
        </>
    );
}
