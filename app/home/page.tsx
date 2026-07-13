import Hero from "@/app/components/Home/Hero";
import AboutSection from "@/app/components/Home/AboutUs";
import ProductsSection from "@/app/products/page";
import ContactSection from "@/app/components/Home/ContactsSection";
import AchievementsSection from "@/app/components/Home/AchievementsSection";

export default function Home() {
    return (
        <main>
           <Hero/>
            <AboutSection/>
            <AchievementsSection/>
            <ProductsSection/>
            <ContactSection/>
        </main>
    );
}