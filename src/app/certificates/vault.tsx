import CertificateCard from "../components/certificates/certificate-card";
import certificates from "@/../utils/Data/certificates";
import Link from "next/link";

export default function CertificatesVault() {
  return (
    <section className="min-h-screen py-24 px-4 lg:px-0 flex flex-col items-center bg-gradient-to-b from-[#f9f1e7] via-[#f4eee6] to-[#efe6da] dark:from-[#1a0101] dark:to-[#0a0101] transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <span className="w-8 h-[1px] bg-red-500/50"></span>
            <span className="text-xs font-bold uppercase tracking-[0.5em]">Vault</span>
            <span className="w-8 h-[1px] bg-red-500/50"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white text-center mb-4">
            The <span className="text-red-600">Digital</span> Vault
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg text-center max-w-2xl">
            A comprehensive archive of professional certificates, achievements, and recognitions.
          </p>
        </div>
        {/* Marquee Infinite Loop */}
        {/* <div className="mb-12">
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            {certificates.map((certificate, idx) => (
              <div className="mx-4 w-[350px] max-w-full" key={idx}>
                <CertificateCard certificate={certificate} />
              </div>
            ))}
          </Marquee>
        </div> */}
        {/* Grid for all certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {certificates.map((certificate, idx) => (
            <CertificateCard key={idx} certificate={certificate} />
          ))}
        </div>
        {/* Button at bottom */}
        <div className="flex justify-center">
          <Link href="/" className="px-8 py-3 rounded-xl bg-red-600 text-white font-bold text-lg shadow-lg hover:bg-red-700 transition-all duration-300 hover:shadow-red-700/20">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
