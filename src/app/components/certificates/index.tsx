import Marquee from "react-fast-marquee";
import CertificateCard from "./certificate-card";
import certificates from "@/../utils/Data/certificates";
import Link from "next/link";

const CertificatesSection = () => {
  return (
    <section id="certificates" className="mt-16">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center transition-colors duration-300">Certificates</h2>
      {/* Marquee Infinite Loop */}
      <div className="mb-8">
        <Marquee speed={40} gradient={false} pauseOnHover={true}>
          {certificates.map((certificate, idx) => (
            <div className="mx-4 w-[350px] max-w-full" key={idx}>
              <CertificateCard certificate={certificate} />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/certificates" className="px-8 py-3 rounded-xl bg-red-600 text-white font-bold text-lg shadow-lg hover:bg-red-700 transition-all">
          View All Certificates
        </Link>
      </div>
    </section>
  );
};

export default CertificatesSection;
