import { dbStore } from '../config/databaseStore.js';

export const CATEGORIES = dbStore.getCategories();
export const PRODUCTS = dbStore.getProducts();
