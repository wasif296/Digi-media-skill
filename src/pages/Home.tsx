
import { Box } from '@mantine/core';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import WhatsAppButton from '../components/WhatsAppButton';
import Services from '../sections/Service';
import TrustedBy from '../sections/TrustedBy';
import Portfolio from '../sections/Portfolio';
import Industries from '../sections/Industries';
import Clientsays from '../sections/Clientsays';
import CTASection from '../sections/CTASection';
import ContactForm from '../sections/ContactForm';
import Footer from '../sections/Footer';
import Aboutus from '../sections/Aboutus';
import Process from '../sections/Process';

const HomePage = () => {
  return (
    <Box style={{ 
      background: '#020408', 
      backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
      backgroundSize: '40px 40px', 
      minHeight: '100vh', 
      color: 'white',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <Navbar />

  <section id="home"><Hero /></section>
  <TrustedBy />
  <Aboutus />
  
  <section id="services"><Services /></section>
  
  <section id="portfolio"><Portfolio /></section>
  
  <section id="industries"><Industries /></section>
  
  <Process />
  <Clientsays />
  <CTASection />

  <section id="contact"><ContactForm /></section>
  
  <section id="footer"><Footer /></section>

  <WhatsAppButton />

    </Box>
  );
};

export default HomePage;