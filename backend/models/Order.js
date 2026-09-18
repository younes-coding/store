import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.Mixed
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  selectedColor: {
    name: { type: String, default: '' },
    nameAr: { type: String, default: '' },
    hex: { type: String, default: '' }
  },
  selectedSize: { type: String, default: 'M' },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, default: '' }
}, { _id: false });

const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, default: 'client@younes.dz' },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, default: 'الجزائر' },
  wilaya: { type: String, default: 'الجزائر' },
  postalCode: { type: String, default: '13000' },
  country: { type: String, default: 'الجزائر' },
  notes: { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    customer: customerSchema,
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    }
  },
  { timestamps: true, strict: false }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
