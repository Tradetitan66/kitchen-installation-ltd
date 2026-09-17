import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import Gallery from "./components/Gallery";
import Process from "./components/Process";
import Trust from "./components/Trust";
import EnquiryForm from "./components/EnquiryForm";
import Footer from "./components/Footer";
import MobileWhatsBar from "./components/MobileWhatsBar";
import WhatsAppModal from "./components/WhatsAppModal";
import { EnquiryProvider } from "./context/enquiry";

export default function App() {
  return (
    <EnquiryProvider>
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Gallery />
        <Process />
        <Trust />
        <EnquiryForm />
      </main>
      <Footer />
      <MobileWhatsBar />
      <WhatsAppModal />
    </EnquiryProvider>
  );
}