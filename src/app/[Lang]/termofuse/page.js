import Header from "@/components/header";
import Footer from "@/components/Footer";

export default async function TermsOfUsePage({params}) {
  const { Lang } = await params;
  return (
        <>
        <Header className="shadow-sm"/>
      <div className="bg-gradient-to-b from-gray-100 to-gray-50 py-10 px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-600 mb-4">
            Conditions Générales d'Utilisation (CGU)
          </h1>
          <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : 01 MARS 2025</p>
  
          <section className="space-y-6">
            {/* Introduction */}
            <p className="text-gray-700">
            Bienvenue sur <strong className="font-bold text-black">Expatlife-uae.com</strong>. Les présentes Conditions Générales d'Utilisation ("Conditions") régissent l'accès et l'utilisation de notre site web www.expatlife-uae.com (le "Site") ainsi que des services fournis par Expat Life UAE ("nous", "notre" ou "nos"). En accédant à notre Site ou en utilisant nos services, vous acceptez de vous conformer à ces Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser notre Site ou nos services.
            </p>
  
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Services Fournis</h2>
              <p className="mb-3">ExpatLife-uae.com propose des services liés à :</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Aide à l’installation aux Émirats arabes unis.</li>
                <li>Accompagnement à la création d’entreprise.</li>
                <li>Assistance pour les demandes de visa et de résidence.</li>
                <li>Conseil en entreprise (juridique, financier, administratif).</li>
                <li>Stratégies de communication et développement commercial.</li>
              </ul>
            </div>
  
            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Éligibilité</h2>
              <p className="mb-3">En utilisant notre Site et nos services, vous confirmez que vous :</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Être âgé d’au moins 18 ans.</li>
                <li>Être légalement capable de conclure un contrat.</li>
                <li>Fournir des informations exactes et complètes.</li>
              </ul>
            </div>
  
            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Obligations de l'Utilisateur</h2>
              <p className="mb-3">Vous acceptez de :</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Respecter toutes les lois et réglementations applicables.</li>
                <li>Maintenir la confidentialité de ses identifiants.</li>
                <li>Ne pas utiliser le Site à des fins illégales ou frauduleuses.</li>
              </ul>
            </div>
  
            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Paiement et Frais</h2>
              <p>Les frais de services sont précisés dans un contrat distinct. Tout retard ou défaut de paiement peut entraîner la suspension des services.</p>
            </div>
  
            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Propriété Intellectuelle</h2>
              <p>Le contenu du Site est protégé par les lois sur la propriété intellectuelle. Toute reproduction est interdite sans autorisation.</p>
            </div>
  
            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Confidentialité</h2>
              <p>Les données personnelles sont traitées conformément à notre Politique de Confidentialité et aux lois des Émirats Arabes Unis.</p>
            </div>
  
            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Limitation de Responsabilité</h2>
              <p>Expatlife-uae.com ne peut être tenu responsable de :</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Toute perte ou dommage direct ou indirect résultant de l'utilisation de notre Site ou de nos services.</li>
                <li>Toute perte de revenus, de profits ou d’opportunités commerciales.</li>
                <li>Tout retard ou interruption de service dû à des circonstances hors de notre contrôle.</li>
              </ul>
            </div>
  
            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Résiliation</h2>
              <p>Nous nous réservons le droit de :</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Suspendre ou résilier votre accès au Site ou à nos services en cas de violation des présentes Conditions.</li>
                <li>Refuser de fournir un service à notre discrétion.</li>
              </ul>
            </div>
  
            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">9. Modifications des Conditions</h2>
              <p>Nous pouvons mettre à jour ces Conditions de temps à autre. Toute modification sera publiée sur cette page avec la date de mise à jour. En continuant d’utiliser le Site après une mise à jour, vous acceptez les nouvelles Conditions.</p>
            </div>
  
            {/* Section 10 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">10. Droit Applicable</h2>
              <p>Les présentes Conditions sont soumises au droit des Émirats arabes unis.</p>
            </div>
  
            {/* Section 11 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">11. Contact</h2>
              <p>Pour toute question, contactez-nous :
                <br />
                <a href="mailto:contact@expatlife-uae.com" className="text-teal-500 underline">contact@expatlife-uae.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer/>
     </>
    );
}
