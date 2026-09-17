import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import Gallery from "./components/Gallery";
import Process from "./components/Process";
import Trust from "./components/Trust";
import EnquiryForm from "./components/EnquiryForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
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
    </>
  );
}