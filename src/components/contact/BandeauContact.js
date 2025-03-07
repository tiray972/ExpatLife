import Link from "next/link";

const BandeauContact = () => {
    return (
      <div className="bg-teal-200 flex items-center justify-between px-6 py-3 rounded-lg shadow-md">
        <p className="text-teal-800 font-semibold">
          Obtenir des conseils rapidement par un conseiller{" "}
          <Link href="tel:+971 56 812 7898">
          <span className="text-teal-800 font-bold pl-5 underline">+971 56 812 7898</span>
          </Link>
        </p>
        <a
          href="https://wa.me/971568127898"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M8.051 0a7.946 7.946 0 0 0-7.95 7.95 7.85 7.85 0 0 0 1.115 4.059L.023 16l4.13-1.073a7.948 7.948 0 0 0 3.898.988h.001a7.948 7.948 0 0 0 7.948-7.95A7.946 7.946 0 0 0 8.05 0zm3.916 10.622c-.166.47-.948.895-1.318.955-.34.053-.755.076-1.22-.077-.282-.092-.645-.21-1.108-.41-1.955-.819-3.232-2.736-3.33-2.863-.097-.128-.797-1.062-.797-2.026s.505-1.436.684-1.635c.179-.2.39-.25.52-.25s.26.004.373.007c.12.003.28-.046.44.337.166.393.56 1.364.61 1.464.05.1.083.22.017.35s-.1.22-.2.35c-.1.13-.21.23-.31.38-.1.15-.22.31-.1.52s.65 1.08 1.4 1.54c.98.63 1.72.83 1.97.92.25.08.39.07.54-.05.17-.13.68-.79.86-1.07s.36-.22.61-.13c.25.08 1.61.76 1.89.9.28.13.47.2.54.31.07.12.07.66-.1 1.13z" />
          </svg>
          Discuter Maintenant
        </a>
      </div>
    );
  };
  
  export default BandeauContact;
  