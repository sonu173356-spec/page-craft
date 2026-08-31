import HeroSection from '@/components/home/HeroSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import PublishingServices from '@/components/home/PublishingServices';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import AuthorSuccessStories from '@/components/home/AuthorSuccessStories';
import PublishingPackages from '@/components/home/PublishingPackages';
import LatestBooks from '@/components/home/LatestBooks';
import BookCategories from '@/components/home/BookCategories';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFAF6]">
      <HeroSection />
      <FeaturedBooks />
      <PublishingServices />
      <HowItWorks />
      <WhyChooseUs />
      <AuthorSuccessStories />
      <PublishingPackages />
      <LatestBooks />
      <BookCategories />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
