import FAQList from "./FAQList";
import FAQChatbot from "./FAQChatbot";
import Navbar from "../navbar";
import Footer from "../presentation/footerFree";

export default function FAQPage() {
  return (
    <div>
      <Navbar />

      <section className="px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <FAQList />
        <FAQChatbot />
      </section>

      <Footer />
    </div>
  );
}
