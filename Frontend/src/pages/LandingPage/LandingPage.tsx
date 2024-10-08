import Header from '../../components/Header/Header';
import Hero from '../../components/Landingpage/Hero/Hero';
import WhyChooseUs from '../../components/Landingpage/WhyUs/WhyUsSection';
import Membership from '../../components/Landingpage/Membership/Membership';
import CourseGallery from '../../components/Landingpage/CourseGallery/CourseGallery';
import Contact from '../../components/Landingpage/ContactSection/Contact';
import Footer from '../../components/Footer/Footer';
import Login from '../../components/Auth/Login';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  //useEffect to handle scroll lock when login form is open

  useEffect(() => {
    if (loginOpen) {
      //disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      //enable scroll
      document.body.style.overflow = 'unset';
    }
    // cleanup function for when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loginOpen]);

  return (
    <>
      <Header setLoginOpen={setLoginOpen} />
      <Hero />
      <WhyChooseUs />
      <Membership />
      <CourseGallery />
      <Contact />
      <Footer />
      {loginOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Login setLoginOpen={setLoginOpen} />
        </div>
      )}
    </>
  );
}
