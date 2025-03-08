import Header from "@/components/header";
import Footer from "@/components/Footer";

export default async function CVGPage({params}) {
  const { Lang } = await params;
    return (
        <>
        <Header lang={Lang} className="shadow-sm"/>
      <div className="bg-gradient-to-b from-gray-100 to-gray-50 py-10 px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-600 mb-4">
            Conditions Générales de Vente (CGV)
          </h1>
          <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : 21 NOV 2024</p>
  
          <section className="space-y-6">
            {/* Introduction */}
            <p className="text-gray-700">
              Bienvenue sur le site <strong>ExpatLife.com</strong> (
              <a
                href="https://expatlife-uae.com"
                className="text-teal-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://expatlife-uae.com
              </a>
              ), une société immatriculée à Meydan U.A.E sous le numéro de licence commerciale 
              <strong>2310215.01</strong>. Ces CGV définissent les droits et obligations des parties dans 
              l’utilisation de nos services.
            </p>
  
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Objet des CGV</h2>
              <p>Les présentes conditions régissent les services proposés par la plateforme ExpatLife.com, notamment :</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>La mise en relation entre propriétaires, agences et locataires.</li>
                <li>La publication d'annonces immobilières.</li>
                <li>L'accompagnement complet pour expatriés (visa, Emirates ID, etc.).</li>
                <li>Suivi et gestion des clients déjà installés.</li>
              </ul>
            </div>
  
            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Services proposés</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Mise en relation entre locataires et propriétaires/agences.</li>
                <li>Publication et gestion d'annonces immobilières.</li>
                <li>Assistance pour démarches administratives et expatriation.</li>
                <li>Services additionnels pour faciliter la vie quotidienne (écoles, assurances, véhicules).</li>
              </ul>
            </div>
  
            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Obligations des utilisateurs</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">3.1 Obligations des agences immobilières</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Les agences déposant des annonces doivent être enregistrées auprès de la RERA et fournir un numéro 
                    d’enregistrement valide.
                  </li>
                  <li>Les agences non enregistrées ne peuvent publier d’annonces sur ExpatLife.</li>
                  <li>Toute annonce frauduleuse sera immédiatement supprimée.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">3.2 Responsabilité du locataire</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Les frais (commission, services) sont clairement indiqués dans le contrat de location, conformément 
                    à la loi RERA.
                  </li>
                  <li>
                    Le locataire doit respecter les termes du contrat et s’acquitter des montants dus au moment de la 
                    finalisation de la transaction.
                  </li>
                </ul>
              </div>
            </div>
  
            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Responsabilités</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  ExpatLife.com s’engage à respecter les réglementations de la RERA, garantissant une transparence 
                  totale et une intégrité dans toutes les transactions.
                </li>
                <li>
                  ExpatLife.com agit en tant qu’intermédiaire et ne peut être tenu responsable des litiges entre 
                  propriétaires, agences et locataires.
                </li>
                <li>Les utilisateurs sont responsables des engagements contractuels pris.</li>
              </ul>
            </div>
  
            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Tarifs et Paiements</h2>
              <p>Les utilisateurs professionnels peuvent publier gratuitement des annonces immobilières sur la plateforme ExpatLife.com, conformément aux règles de la RERA (Real Estate Regulatory Agency).</p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">5.1 Commissions sur les locations</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Une commission de 5 % est appliquée sur le montant total de la location et qui sera versée 
                    directement à Expatlife.com.
                  </li>
                  <li>
                    Cette commission est à la charge du locataire, conformément à la réglementation RERA, et sera 
                    versée par virement, chèque ou espèce.
                  </li>
                  <li>
                  Pour les agences immobilières enregistrées, cette commission est partagée équitablement entre ExpatLife.com et l'agence déposant l'annonce au titre de 2.5% pour l’un et 2.5% pour l’autre. La commission sera reversée sous 5 jours à l’agence par virement ou chèque bancaire.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">5.2 Deposit pour les locataires</h3>
                <p>Conformément à la réglementation RERA :</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Le dépôt de garantie est une obligation pour le locataire et sert à couvrir d’éventuels dommages ou 
                    manquements au contrat de location.
                  </li>
                  <li>
                    Le dépôt est versé directement au propriétaire ou à l’agence immobilière mandatée.
                  </li>
                  <li>
                    Montant du dépôt :
                    <ul className="list-disc pl-5 space-y-2">
                      <li>5 % du loyer pour les logements non meublés.</li>
                      <li>Jusqu’à 10 % du loyer pour les logements meublés.</li>
                    </ul>
                  </li>
                  <li>Le propriétaire est tenu de restituer ce dépôt au locataire à la fin du contrat, sous réserve de l’état du logement et de l’absence de litiges.</li>
                </ul>
                <p>Cette mesure garantit la sécurité et la transparence des relations entre locataires et propriétaires.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">5.3 Modalités de paiement</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                  Les paiements (commissions, deposits) doivent être effectués via des moyens conformes aux directives locales, tels que le virement bancaire ou des systèmes de paiement approuvés.
                  </li>
                  <li>
                  Les paiements sont dus au moment de la signature du contrat de location.
                  </li>
                  
                </ul>
              </div>
            </div>
  
            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Juridiction compétente</h2>
              <p className="text-gray-700">
                Tout litige sera soumis aux tribunaux compétents de Dubaï, en conformité avec la législation des 
                Émirats Arabes Unis.
              </p>
            </div>
  
            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Contact</h2>
              <p className="text-gray-700">
                Pour toute question ou assistance :
                <br />
                <a
                  href="mailto:contact@expatlife-uae.com"
                  className="text-teal-500 underline"
                >
                  contact@expatlife-uae.com
                </a>
              </p>
            </div>
            <p className="text-gray-700">
            Nous traitons les données personnelles conformément aux lois en vigueur aux Émirats Arabes Unis.
            </p>
          </section>
        </div>
        
      </div>
      <Footer lang={Lang}/>
     </>
    );
  }
  