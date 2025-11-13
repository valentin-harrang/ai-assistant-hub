import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résultats Feedback - Formation IA & Next.js",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
