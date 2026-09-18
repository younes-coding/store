import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, default: '#1a1a1a' }
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    originalPrice: {
      type: Number,
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    categoryLabel: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 4.8
    },
    reviewCount: {
      type: Number,
      default: 12
    },
    images: {
      type: [String],
      required: true,
      default: []
    },
    colors: [colorSchema],
    sizes: {
      type: [String],
      default: ['S', 'M', 'L']
    },
    description: {
      type: String,
      required: true
    },
    fabricCare: {
      type: [String],
      default: []
    },
    details: {
      type: [String],
      default: []
    },
    shippingPolicy: {
      type: String,
      default: ''
    },
    isNewItem: {
      type: Boolean,
      default: true
    },
    isBestSeller: {
      type: Boolean,
      default: false
    },
    isSale: {
      type: Boolean,
      default: false
    },
    stockCount: {
      type: Number,
      required: true,
      default: 10
    }
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
