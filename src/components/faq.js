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
    <div className="bg-white pt-6 ">
      <div className="max-w-full px-6 md:px-20 2xl:px-96 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-teal-500 text-left mb-6">FAQ</h1>
        <Accordion type="single" collapsible>
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='text-xl' >{item.question}</AccordionTrigger>
              <AccordionContent className='text-lg'>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
