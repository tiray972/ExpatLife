"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { PlaneTakeoff, FileText, HeartPulse, Banknote, BriefcaseBusiness } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

let steps = [
    {
      id: 1,
      title: "PRISE EN CHARGE DE TOUTES LES FORMALITÉS",
      intro: "PRISE EN CHARGE DE TOUTES LES FORMALITÉS LIÉES À LA CRÉATION DE VOTRE SOCIÉTÉ",
      description: [
        "Rédaction des statuts juridiques et documents d’incorporation.",
        "Enregistrement de votre entreprise auprès des autorités compétentes.",
        "Obtention de votre licence commerciale en fonction de votre secteur d’activité.",
        "Assistance pour la location d’un bureau physique ou d’une adresse virtuelle selon vos besoins.",
        "Gestion complète des démarches légales et administratives.",
      ],
      image: "/images/passport.png",
      icon: <FileText size={24} />,
    },
    {
      id: 2,
      title: "ACCOMPAGNEMENT POUR LE VISA DE RÉSIDENCE",
      intro: "ACCOMPAGNEMENT DANS TOUTES LES DÉMARCHES LIÉES À VOTRE VISA DE RÉSIDENCE, AINSI QUE CEUX DE VOTRE FAMILLE ET DE VOS EMPLOYÉS SI BESOIN",
      description: [
        "La préparation à votre entrée sur le territoire.",
        "La demande, le suivi et la livraison de votre Emirates ID.",
        "Les formalités médicales obligatoires : prise de sang, empreintes, etc.",
        "Le parrainage de vos proches et employés (sponsorship).",
        "Obtention de visas pour vous et votre famille.",
      ],
      image: "/images/215.png",
      icon: <HeartPulse size={24} />,
    },
    {
      id: 3,
      title: "OUVERTURE DE COMPTE BANCAIRE",
      intro: "OUVERTURE DE VOTRE COMPTE BANCAIRE PROFESSIONNEL EN TOUTE SÉRÉNITÉ ET SANS COMPLICATIONS",
      description: [
        "Un choix de la banque la plus adaptée à vos besoins, parmi nos partenaires.",
        "Un accompagnement pour la constitution du dossier.",
        "Une mise en relation avec des conseillers bancaires spécialisés.",
        "Assistance post-ouverture et gestion bancaire pour optimiser son utilisation et gérer efficacement vos transactions.",
        "Ouverture de compte bancaire professionnel.",
      ],
      icon: <Banknote size={24} />,
      image: "/images/bank.png",
    },
    {
      id: 4,
      title: "SUPPORT ET ACCOMPAGNEMENT POST-CRÉATION",
      intro: "NOUS RESTONS À VOS CÔTÉS POUR VOUS ASSURER UNE GESTION FLUIDE ET CONFORME DE VOTRE ACTIVITÉ",
      description: [
        "Accompagnement en comptabilité, pour une gestion financière sereine.",
        "Assistance pour la croissance et l’expansion avec des partenaires stratégiques.",
        "Support administratif et RH pour optimiser la gestion de votre entreprise.",
        "Suivi des obligations légales et fiscales, renouvellement de votre licence, gestion des visas et conformité fiscale.",
        "Support et accompagnement post-création.",
      ],
      icon: <BriefcaseBusiness size={24} />,
      image: "/images/215.png",
    },
  ];
  

export default function Timeline({ dictionary }) {
  const { scrollYProgress } = useScroll();
  if (dictionary.support.steps) {
    steps = dictionary.support.steps;
    

  }
  const iconMap = {
    "file-text": <FileText size={24} />,
    "heart-pulse": <HeartPulse size={24} />,
    "banknote": <Banknote size={24} />,
    "briefcase-business": <BriefcaseBusiness size={24} />
  };
  return (
    <div id="timeline" className="relative min-h-screen bg-teal-200 flex flex-col items-center justify-center py-20 px-6">
      <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-900 mb-4" >{dictionary.support.our_steps}</h2>
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 h-full w-[4px] bg-white"
        style={{ scaleY: scrollYProgress }}
      ></motion.div>

      <div className="relative w-full max-w-7xl space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex items-center w-full justify-center ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
          >
            <Card className="bg-white shadow-lg p-6 rounded-lg max-w-xl">
              <CardContent>
                <p className="text-2xl text-teal-700 uppercase my-2" >{step.step_name}</p>
                <h3 className="text-lg font-semibold uppercase text-gray-700">{step.title}</h3>
                <p className="text-sm text-teal-500 uppercase mt-2">{step.intro}</p>
                <ul className="text-sm text-gray-500 mt-2 list-disc list-inside">
                    {step.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
              </CardContent>
            </Card>

            <div className="relative md:w-14 w-44 h-14 flex items-center justify-center bg-white text-green-600 rounded-full shadow-lg mx-4 md:mx-8">
            {iconMap[step.icon]}
            </div>
            <Image
            src={step.image}
            alt='image represantant la cle en main'
            width={400}
            height={175}
            className="rounded-lg md:block hidden shadow-md"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
