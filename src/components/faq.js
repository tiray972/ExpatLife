'use client';

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion'; // Assurez-vous du bon chemin vers votre fichier `accordion`.


export default function FAQ({faqData}) {

  return (
    <div className="bg-white ">
      <div className="max-w-full p-16 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-left mb-6">FAQ</h1>
        <Accordion type="single" collapsible>
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
