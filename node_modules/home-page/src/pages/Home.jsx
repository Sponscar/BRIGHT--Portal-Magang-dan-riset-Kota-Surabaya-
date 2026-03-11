
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Timeline from '../components/Timeline';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col font-display">
            <Header />
            <main className="flex-grow">
                <Hero />
                <Features />
                <About />
                <Timeline />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
