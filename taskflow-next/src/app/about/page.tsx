import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="page-title">À propos</h1>
      <p>
        TaskFlow version Next.js : le même projet que le TP3, sans routeur à configurer ni API à
        démarrer.
      </p>
      <p className="muted">Module React + Next.js · M2 ESIEE-IT</p>
    </>
  );
}
