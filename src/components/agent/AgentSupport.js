"use client";

export default function AgentSupport() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Support</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>
          Have questions or need assistance? We're here to help. Here’s how you can contact us:
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@expatlife-uae.com" className="text-blue-600 underline">
              contact@expatlife-uae.com
            </a>
          </li>
        </ul>
        <p className="mt-4">Available 24/7.</p>
      </div>
    </div>
  );
}
