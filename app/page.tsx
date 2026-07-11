import Hero from "@/app/components/Hero";
import AboutSection from "@/app/components/AboutUs";
import ProductsSection from "@/app/products/page";
import ContactSection from "@/app/components/ContactsSection";

export default function Home() {
    return (
        <main>
           <Hero/>
            <AboutSection/>
            <ProductsSection/>
            <ContactSection/>
        </main>
    );
}