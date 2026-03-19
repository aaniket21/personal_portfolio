"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CertificateCardProps } from "@/Types/types";
import { ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const firstImage = certificate.image;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Helper function to check if certificate is less than a month old
  const isNewCertificate = (dateString: string) => {
    if (!dateString) return false;
    try {
      const certDate = new Date(dateString);
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      return certDate >= oneMonthAgo && certDate <= currentDate;
    } catch {
      return false;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-red-300/20 via-amber-200/10 to-transparent opacity-70 blur-2xl transition-opacity duration-300 dark:opacity-0" />

      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.1), transparent 40%)`,
        }}
      />

      <Card className="relative flex flex-col h-full justify-between border border-slate-300/70 dark:border-white/10 bg-[#fff8f1]/85 dark:bg-[#050505]/20 backdrop-blur-xl rounded-2xl shadow-[0_16px_36px_rgba(68,42,22,0.14)] dark:shadow-2xl overflow-hidden transition-all duration-500 hover:border-red-600/50 hover:shadow-red-600/10">
        <div className="flex-1">
          <div className="relative overflow-hidden aspect-video">
            {firstImage ? (
              <Image
                src={firstImage}
                width={800}
                height={450}
                alt={certificate.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <span className="text-slate-600">{certificate.title}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#20140d]/40 dark:from-[#050505] to-transparent opacity-80" />
            {isNewCertificate(certificate.date) && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-900 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse z-10 border border-white/10">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold tracking-wider">
                  NEW
                </span>
              </div>
            )}
          </div>
          <CardHeader className="p-6 pb-2">
            <Link href={certificate.link || "#"} target="_blank" className="group/title inline-block">
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover/title:text-red-500 transition-colors flex items-center gap-2 tracking-tight">
                {certificate.title}
                <ExternalLink className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 group-hover/title:translate-x-0 transition-all text-red-500" />
              </CardTitle>
            </Link>
          </CardHeader>
          <CardContent className="px-6">
            <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm mb-6 leading-relaxed font-medium italic">
              {certificate.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-[11px] font-bold bg-slate-900/5 dark:bg-white/5 border border-slate-300/70 dark:border-white/10 text-slate-600 dark:text-slate-400 rounded-lg">
                {certificate.issuer}
              </span>
            </div>
          </CardContent>
        </div>
        <CardFooter className="p-6 pt-2 flex gap-4">
          <Link href={certificate.link || "#"} target="_blank" className="flex-1">
            <Button
              className={`w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-slate-300/70 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 hover:bg-red-600 text-slate-900 dark:text-white hover:text-white hover:border-red-500 shadow-sm dark:shadow-xl hover:shadow-red-600/20`}
              disabled={!certificate.link}
            >
              <ExternalLink className="w-4 h-4" />
              View Certificate
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CertificateCard;
