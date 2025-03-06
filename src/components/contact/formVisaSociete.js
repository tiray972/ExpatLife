"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function MultiStepForm({ dictionary }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    country: "",
    profession: "",
    companyExists: "",
    activity: "",
    startDate: "",
    needsVisa: "",
    needsFamilySponsorship: "",
    assistance: [],
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      assistance: prev.assistance.includes(value)
        ? prev.assistance.filter((item) => item !== value)
        : [...prev.assistance, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(dictionary.contact.sending);

    const messageContent = Object.entries(formData)
      .map(([key, value]) => `${dictionary.form[key] || key}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, surname: formData.surname, message: messageContent }),
      });

      if (response.ok) {
        setStatus(dictionary.contact.success);
        setFormData({
          country: "",
          profession: "",
          companyExists: "",
          activity: "",
          startDate: "",
          needsVisa: "",
          needsFamilySponsorship: "",
          assistance: [],
          name: "",
          surname: "",
          email: "",
          phone: "",
        });
        setStep(1);
      } else {
        setStatus(dictionary.contact.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus(dictionary.contact.error);
    }
  };

  const steps = [
    {
      fields: [
        { name: "country", type: "text" },
        { name: "profession", type: "text" },
        { name: "companyExists", type: "select", options: ["yes", "no"] },
      ],
    },
    {
      fields: [
        { name: "activity", type: "text" },
        { name: "startDate", type: "date" },
      ],
    },
    {
      fields: [
        { name: "needsVisa", type: "select", options: ["yes", "no"] },
        ...(formData.needsVisa === "yes" ? [{ name: "needsFamilySponsorship", type: "select", options: ["yes", "no"] }] : []),
      ],
    },
    {
      fields: [
        {
          name: "assistance",
          type: "checkbox",
          options: ["accounting", "legal", "marketing", "recruitment"],
        },
      ],
    },
    {
      fields: [
        { name: "name", type: "text" },
        { name: "surname", type: "text" },
        { name: "email", type: "email" },
        { name: "phone", type: "tel" },
      ],
      submit: true,
    },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <CardContent>
        <h2 className="text-2xl font-bold text-teal-600 mb-4">{dictionary.form.title}</h2>

        <form onSubmit={step === steps.length ? handleSubmit : (e) => e.preventDefault()} className="space-y-4">
          {steps[step - 1].fields.map((field) => (
            <div key={field.name}>
              <Label>{dictionary.form[field.name]}</Label>

              {field.type === "text" || field.type === "email" || field.type === "tel" || field.type === "date" ? (
                <Input type={field.type} value={formData[field.name]} onChange={(e) => handleChange(field.name, e.target.value)} required />
              ) : field.type === "select" ? (
                <Select onValueChange={(value) => handleChange(field.name, value)} value={formData[field.name]}>
                  <SelectTrigger>
                    <SelectValue placeholder={dictionary.form.select} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {dictionary.form[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "checkbox" ? (
                <div className="space-y-2">
                  {field.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={option} checked={formData.assistance.includes(option)} onCheckedChange={() => handleCheckboxChange(option)} />
                      <Label htmlFor={option}>{dictionary.form[option]}</Label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          {step === steps.length && (
            <>
              <Label>{dictionary.form.message}</Label>
              <Textarea value={Object.entries(formData).map(([key, value]) => `${dictionary.form[key] || key}: ${Array.isArray(value) ? value.join(", ") : value}`).join("\n")} disabled />
              {status && <p className="text-sm text-red-500">{status}</p>}
            </>
          )}

          <div className="flex justify-between">
            {step > 1 && <Button variant="outline" onClick={() => setStep((prev) => prev - 1)}>{dictionary.form.previous}</Button>}
            {step < steps.length ? (
              <Button onClick={() => setStep((prev) => prev + 1)}>{dictionary.form.next}</Button>
            ) : (
              <Button type="submit">{dictionary.form.submit}</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
