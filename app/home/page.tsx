import Hero from "@/app/components/UserSideComponents/Hero";
import AboutSection from "@/app/components/UserSideComponents/AboutUs";
import ProductsSection from "@/app/products/page";
import ContactSection from "@/app/components/UserSideComponents/ContactsSection";
import AchievementsSection from "@/app/components/UserSideComponents/AchievementsSection";

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