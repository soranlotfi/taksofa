import Hero from "@/app/components/UserSideComponents/Hero";
import AboutUs from "@/app/components/UserSideComponents/AboutUs";
import ProductsSection from "@/app/products/page";
import ContactSection from "@/app/components/UserSideComponents/ContactSection";
import AchievementsSection from "@/app/components/UserSideComponents/AchievementsSection";

export default function Home() {
    return (
        <main>
           <Hero/>
            <AboutUs/>
            <AchievementsSection/>
            <ProductsSection/>
            <ContactSection/>
        </main>
    );
}