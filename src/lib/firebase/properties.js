import { doc, addDoc, collection, updateDoc, arrayUnion, getDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/firebase";




// Ajouter une propriété pour l'agent
export async function addPropertyForAgent(property) {
  const user = auth.currentUser;
  if (!user) return alert("Please log in as an agent.");

  try {
    // Ajouter la propriété à la collection `properties`
    const propertyRef = await addDoc(collection(db, "properties"), {
      ...property,
      agentId: user.uid,
    });

    // Mettre à jour la liste des propriétés de l'agent
    const agentRef = doc(db, "users", user.uid);
    await updateDoc(agentRef, {
      properties: arrayUnion(propertyRef.id), // Ajout de l'ID de la nouvelle propriété
    });

    alert("Property added successfully!");
  } catch (error) {
    console.error("Error adding property: ", error);
  }
}

// Récupérer les propriétés de l'agent
export async function fetchAgentProperties() {
  const user = auth.currentUser;
  if (!user) return alert("Please log in as an agent.");

  try {
    // Récupérer le document de l'agent
    const agentRef = doc(db, "users", user.uid);
    const agentSnap = await getDoc(agentRef);

    if (agentSnap.exists()) {
      const { properties } = agentSnap.data();

      // Vérifier si le champ `properties` existe et est un tableau
      if (Array.isArray(properties) && properties.length > 0) {
        // Récupérer toutes les propriétés référencées
        const q = query(collection(db, "properties"), where("__name__", "in", properties));
        const querySnapshot = await getDocs(q);

        const propertyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,  // Ajout de l'ID de la propriété
          ...doc.data() // Récupération des données de la propriété
        }));

        return propertyList;  // Retourner la liste des propriétés de l'agent
      } else {
        console.log("Aucune propriété trouvée pour cet agent.");
      }
    } else {
      console.log("Aucun document agent trouvé.");
    }
  } catch (error) {
    console.error("Error fetching properties: ", error);
  }
}

// Récupérer les favoris du client
export async function fetchClientFavorites() {
  const user = auth.currentUser;
  if (!user) return alert("Please log in as a client.");

  try {
    // Récupérer le document du client
    const clientRef = doc(db, "users", user.uid);
    const clientSnap = await getDoc(clientRef);

    if (clientSnap.exists()) {
      const { favorites } = clientSnap.data();

      // Vérifier si le champ `favorites` existe et est un tableau
      if (Array.isArray(favorites) && favorites.length > 0) {
        // Récupérer toutes les propriétés favorites
        const q = query(collection(db, "properties"), where("__name__", "in", favorites));
        const querySnapshot = await getDocs(q);

        const favoriteList = querySnapshot.docs.map((doc) => ({
          id: doc.id,  // Ajout de l'ID de la propriété
          ...doc.data() // Récupération des données de la propriété
        }));

        return favoriteList;  // Retourner la liste des propriétés favorites
      } else {
        console.log("Aucun favori trouvé pour ce client.");
      }
    } else {
      console.log("Aucun document client trouvé.");
    }
  } catch (error) {
    console.error("Error fetching favorites: ", error);
  }
}