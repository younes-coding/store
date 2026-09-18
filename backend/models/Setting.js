import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: 'LUMIÈRE Atelier Paris'
    },
    contactEmail: {
      type: String,
      default: 'concierge@lumiere.com'
    },
    contactPhone: {
      type: String,
      default: '+33 (0)1 42 68 55 00'
    },
    address: {
      type: String,
      default: '24 Rue du Faubourg Saint-Honoré, 75008 Paris, France'
    },
    freeShippingThreshold: {
      type: Number,
      default: 250
    },
    standardShippingCost: {
      type: Number,
      default: 20
    },
    announcementText: {
      type: String,
      default: '✨ تميّز بأناقة «أولد موني» الراقية — أقمشة نبيلة وتغليف ملكي فاخر مع توصيل استثنائي لباب منزلك'
    },
    homepage: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true, strict: false }
);

export const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
