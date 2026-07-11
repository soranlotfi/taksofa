import fs from 'fs';
import path from 'path';

// ===== تعریف نوع‌ها =====
export interface Product {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    dimensions?: string;
    woodType?: string;
    fabric?: string;
    price: number;
    comparePrice?: number | null;
    isFeatured: boolean;
    isActive: boolean;
    images: string[];
    createdAt: string;
}

export interface Message {
    id: number;
    name: string;
    phone: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface DB {
    products: Product[];
    messages: Message[];
}

// ===== مسیر فایل دیتابیس =====
const dbPath = path.join(process.cwd(), 'data.json');

// ===== خواندن و نوشتن =====
export function readDB(): DB {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ products: [], messages: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
}

export function writeDB(data: DB): void {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// ===== محصولات =====
export function getProducts(): Product[] {
    return readDB().products;
}

export function getProductBySlug(slug: string): Product | undefined {
    return readDB().products.find(p => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
    return readDB().products.find(p => p.id === id);
}

export function addProduct(product: Omit<Product, 'id' | 'slug' | 'createdAt'>): Product {
    const db = readDB();
    const maxId = db.products.reduce((max, p) => Math.max(max, p.id), 0);
    const newProduct: Product = {
        ...product,
        id: maxId + 1,
        slug: product.title.replace(/\s+/g, '-').toLowerCase(),
        createdAt: new Date().toISOString(),
        isActive: product.isActive ?? true,
        isFeatured: product.isFeatured ?? false,
        images: product.images || [],
    };
    db.products.push(newProduct);
    writeDB(db);
    return newProduct;
}

export function updateProduct(id: number, updated: Partial<Product>): Product | null {
    const db = readDB();
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    db.products[index] = { ...db.products[index], ...updated };
    writeDB(db);
    return db.products[index];
}

export function deleteProduct(id: number): boolean {
    const db = readDB();
    db.products = db.products.filter(p => p.id !== id);
    writeDB(db);
    return true;
}

// ===== پیام‌ها =====
export function getMessages(): Message[] {
    return readDB().messages;
}

export function addMessage(message: Omit<Message, 'id' | 'createdAt'>): Message {
    const db = readDB();
    const newMessage: Message = {
        ...message,
        id: Date.now(),
        createdAt: new Date().toISOString(),
    };
    db.messages.push(newMessage);
    writeDB(db);
    return newMessage;
}