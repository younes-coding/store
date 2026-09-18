import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { Setting } from '../models/Setting.js';
import { dbStore } from '../config/databaseStore.js';
import validator from 'validator';

// @desc    Create new order (Customer checkout submission)
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res, next) => {
  try {
    const { customer, items, discount = 0, shippingCost: clientShipping } = req.body;

    // 1. Validate Customer Information
    if (!customer || !customer.fullName || !customer.phone || !customer.address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'يرجى تقديم بيانات العميل والقطع المطلوبة كاملة وبشكل صحيح' });
    }

    const cleanFullName = String(customer.fullName).trim();
    const cleanPhone = String(customer.phone).replace(/\s+/g, '').trim();
    const cleanAddress = String(customer.address).trim();
    const cleanCity = String(customer.city || customer.wilaya || 'الجزائر').trim();
    const cleanWilaya = String(customer.wilaya || customer.country || customer.city || 'الجزائر').trim();
    const cleanEmail = customer.email ? String(customer.email).trim() : 'client@younes.dz';
    const cleanNotes = customer.notes ? String(customer.notes).trim().slice(0, 500) : '';

    // Validate Phone (At least 9 digits)
    const phoneDigits = cleanPhone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 8) {
      return res.status(400).json({ success: false, message: 'رقم الهاتف غير صحيح. يرجى إدخال رقم هاتف جزائري صالح (مثال: 0550123456)' });
    }

    // 2. Server-side Price Verification
    let computedSubtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const quantity = Math.max(1, Math.min(50, parseInt(item.quantity) || 1));
      let unitPrice = Number(item.price) || 0;

      const productId = item.productId || item.product?.id || item.product || item.id || item._id;
      if (productId) {
        let dbProduct = null;
        if (Product.db && Product.db.readyState === 1) {
          try {
            dbProduct = await Product.findById(productId);
          } catch (e) {
            dbProduct = await Product.findOne({ name: item.name });
          }
        }
        if (!dbProduct) {
          dbProduct = dbStore.getProductById(productId) || dbStore.getProducts().find(p => p.name === item.name);
        }

        if (dbProduct && dbProduct.price) {
          unitPrice = Number(dbProduct.price);
        }
      }

      const itemTotal = unitPrice * quantity;
      computedSubtotal += itemTotal;

      verifiedItems.push({
        product: productId || null,
        name: String(item.name || item.product?.name || 'قطعة كلاسيكية'),
        price: unitPrice,
        selectedColor: typeof item.selectedColor === 'object' ? item.selectedColor : { name: String(item.selectedColor || ''), hex: '#000000' },
        selectedSize: String(item.selectedSize || 'M'),
        quantity,
        image: item.image || item.product?.images?.[0] || ''
      });
    }

    // 3. Verified Shipping Calculation
    let standardShipping = 600;
    let freeThreshold = 0;
    let wilayaRates = {};
    
    try {
      let storeSettings = null;
      if (Setting.db && Setting.db.readyState === 1) {
        storeSettings = await Setting.findOne();
      }
      if (!storeSettings) {
        storeSettings = dbStore.getSettings();
      }
      if (storeSettings) {
        standardShipping = Number(storeSettings.standardShippingCost) ?? 600;
        freeThreshold = Number(storeSettings.freeShippingThreshold) ?? 0;
        wilayaRates = storeSettings.wilayaShippingRates || {};
      }
    } catch (e) {
      // fallback
    }

    let wilayaCost = standardShipping;
    if (wilayaRates && wilayaRates[cleanWilaya] !== undefined && Number(wilayaRates[cleanWilaya]) >= 0) {
      wilayaCost = Number(wilayaRates[cleanWilaya]);
    } else if (clientShipping !== undefined && Number(clientShipping) >= 0) {
      wilayaCost = Number(clientShipping);
    }

    const calculatedShipping = (freeThreshold > 0 && computedSubtotal >= freeThreshold) ? 0 : wilayaCost;
    const verifiedDiscount = Math.max(0, Math.min(computedSubtotal, Number(discount) || 0));
    const verifiedTotalAmount = Math.max(0, computedSubtotal - verifiedDiscount + calculatedShipping);

    // Generate sequential purely numeric order reference (1, 2, 3...)
    let nextNum = 1;
    try {
      const allOrders = dbStore.getOrders();
      if (Array.isArray(allOrders) && allOrders.length > 0) {
        const nums = allOrders
          .map(o => parseInt(String(o.orderId || '').replace(/[^0-9]/g, ''), 10))
          .filter(n => !isNaN(n));
        if (nums.length > 0) {
          nextNum = Math.max(...nums) + 1;
        } else {
          nextNum = allOrders.length + 1;
        }
      }
    } catch (e) {
      nextNum = 1;
    }

    const orderId = String(nextNum);

    const orderData = {
      orderId,
      customer: {
        fullName: cleanFullName,
        phone: cleanPhone,
        wilaya: cleanWilaya,
        city: cleanCity,
        address: cleanAddress,
        notes: cleanNotes
      },
      items: verifiedItems,
      subtotal: computedSubtotal,
      discount: verifiedDiscount,
      shippingCost: calculatedShipping,
      totalAmount: verifiedTotalAmount,
      status: 'Pending',
      createdAt: new Date()
    };

    let createdOrder = null;

    if (Order.db && Order.db.readyState === 1) {
      try {
        createdOrder = await Order.create(orderData);
        console.log(`[Order Created in MongoDB] Order ID: ${orderId} by Phone: ${cleanPhone}`);
      } catch (dbErr) {
        console.error('[Order MongoDB Save Warning]:', dbErr.message);
      }
    }

    const storeOrder = dbStore.createOrder(orderData);
    const finalOrder = createdOrder || storeOrder;

    return res.status(201).json({ success: true, data: finalOrder });
  } catch (error) {
    console.error('[Create Order Global Error]:', error);
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Protected Admin
export const getOrders = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    if (Order.db && Order.db.readyState === 1) {
      let query = {};
      if (status && status !== 'all') query.status = status;
      if (search) {
        query.$or = [
          { orderId: { $regex: search, $options: 'i' } },
          { 'customer.fullName': { $regex: search, $options: 'i' } },
          { 'customer.email': { $regex: search, $options: 'i' } }
        ];
      }

      const orders = await Order.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, data: orders });
    }

    const orders = dbStore.getOrders({ status, search });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details
// @route   GET /api/orders/:id
// @access  Protected Admin
export const getOrderById = async (req, res, next) => {
  try {
    if (Order.db && Order.db.readyState === 1) {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
      return res.json({ success: true, data: order });
    }

    const order = dbStore.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'الطلب غير موجود' });

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Protected Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `حالة غير صالحة. الحالات المسموحة: ${validStatuses.join(', ')}` });
    }

    if (Order.db && Order.db.readyState === 1) {
      const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
      dbStore.updateOrderStatus(req.params.id, status);
      return res.json({ success: true, data: updated });
    }

    const updated = dbStore.updateOrderStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ success: false, message: 'الطلب غير موجود' });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Track order publicly by Phone number or Order ID
// @route   GET /api/orders/track/:identifier
// @access  Public
export const trackOrder = async (req, res, next) => {
  try {
    const rawInput = (req.params.identifier || '').trim();
    const queryPhone = (req.query.phone || '').trim();

    if (!rawInput && !queryPhone) {
      return res.status(400).json({ success: false, message: 'يرجى إدخال رقم هاتفك لتتبع الشحنة' });
    }

    const searchStr = rawInput || queryPhone;
    
    // Extract only digits (e.g. 0657533005 -> 657533005)
    const digitsOnly = searchStr.replace(/[^0-9]/g, '');
    const lastDigits = digitsOnly.length >= 9 ? digitsOnly.slice(-9) : digitsOnly;
    const cleanSearch = searchStr.replace(/[^a-zA-Z0-9]/g, '');

    // Construct broad, robust search conditions
    const orConditions = [
      { 'customer.phone': searchStr },
      { orderId: searchStr },
      { orderId: `#${searchStr.replace(/^#/, '')}` },
      { orderId: { $regex: searchStr.replace(/^#/, ''), $options: 'i' } }
    ];

    if (digitsOnly.length >= 4) {
      orConditions.push({ 'customer.phone': { $regex: digitsOnly, $options: 'i' } });
      orConditions.push({ orderId: { $regex: digitsOnly, $options: 'i' } });
    }

    if (lastDigits.length >= 8) {
      orConditions.push({ 'customer.phone': { $regex: lastDigits, $options: 'i' } });
    }

    if (cleanSearch.length >= 3) {
      orConditions.push({ orderId: { $regex: cleanSearch, $options: 'i' } });
    }

    let foundOrder = null;

    if (Order.db && Order.db.readyState === 1) {
      try {
        foundOrder = await Order.findOne({ $or: orConditions }).sort({ createdAt: -1 });
      } catch (e) {
        foundOrder = await Order.findOne({ 'customer.phone': searchStr }).sort({ createdAt: -1 });
      }
    }

    // Fallback in JSON DB store
    if (!foundOrder) {
      const allOrders = dbStore.getOrders();
      foundOrder = allOrders.find(o => {
        const oPhone = String(o.customer?.phone || '').replace(/[^0-9]/g, '');
        const oId = String(o.orderId || o.id || o._id || '').toLowerCase();
        const sLower = searchStr.toLowerCase();

        return (
          (digitsOnly.length >= 4 && oPhone.includes(digitsOnly)) ||
          (lastDigits.length >= 8 && oPhone.includes(lastDigits)) ||
          oPhone === digitsOnly ||
          oId.includes(sLower.replace(/^#/, '')) ||
          sLower.includes(oId.replace(/^#/, ''))
        );
      });
    }

    if (!foundOrder) {
      return res.status(404).json({
        success: false,
        message: `لم نتمكن من العثور على طلب مسجل برقم الهاتف: "${searchStr}". يرجى التأكد من كتابة نفس الرقم الذي استخدمته عند تأكيد الطلب.`
      });
    }

    return res.json({
      success: true,
      data: {
        orderId: foundOrder.orderId || foundOrder.id || '#YS-00000',
        status: foundOrder.status || 'Pending',
        createdAt: foundOrder.createdAt || new Date().toISOString(),
        updatedAt: foundOrder.updatedAt || foundOrder.createdAt || new Date().toISOString(),
        customer: {
          fullName: foundOrder.customer?.fullName || 'زبون يونس سارتوريال',
          city: foundOrder.customer?.city || foundOrder.customer?.wilaya || 'الجزائر',
          wilaya: foundOrder.customer?.country || foundOrder.customer?.wilaya || 'الجزائر',
          phone: foundOrder.customer?.phone || searchStr
        },
        items: foundOrder.items || [],
        subtotal: foundOrder.subtotal || 0,
        shippingCost: foundOrder.shippingCost || 0,
        discount: foundOrder.discount || 0,
        totalAmount: foundOrder.totalAmount || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

