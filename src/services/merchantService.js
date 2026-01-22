import { mockMerchants } from "../data/mockMerchants";

// Static Data
let merchants = [...mockMerchants];

export const merchantService = {
  getAllMerchants() {
    return merchants ? merchants : [];
  },

  getMerchantById(id) {
    return merchants?.find((m) => m.id === id) || null;
  },

  addMerchant(merchant) {
    const newMerchant = {
      id: Date.now(),
      ...merchant,
    };
    merchants.push(newMerchant);
    return newMerchant;
  },

  updateMerchant(id, fields) {
    merchants = merchants.map((m) => (m.id === id ? { ...m, ...fields } : m));
    return merchants.find((m) => m.id === id) || null;
  },
};
