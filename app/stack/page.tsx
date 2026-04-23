"use client";

import { StatusBar, HeaderSection, CategoriesSection, CurrentlyLearningSection, CTASection } from "@/components/stack/StackPageContent";

export default function StackPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Status bar */}
            <StatusBar />

            {/* Header */}
            <HeaderSection />

            {/* ──── Categories ──── */}
            <CategoriesSection />

            {/* ──── Currently Learning ──── */}
            <CurrentlyLearningSection />

            {/* ──── CTA ──── */}
            <CTASection />
        </div>
    );
}
