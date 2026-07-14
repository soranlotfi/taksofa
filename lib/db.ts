import fs from 'fs';
import path from 'path';
import data from "@/data.json"

// ===== تعریف نوع‌ها =====
export interface Settings {
    hero: {
        badge: string;
        title: string;
        highlight: string;
        subtitle: string;
        btnPrimary: string;
        btnSecondary: string;
    };
    about: {
        title: string;
        subtitle: string;
        description1: string;
        description2: string;
        features: string[];
        imagePlaceholder: string;
    };
    contact: {
        title: string;
        subtitle: string;
        supportTitle: string;
        supportDesc: string;
        phone: string;
        phoneHours: string;
        address: string;
        addressLabel: string;
        mobile: string;
        mobileLabel: string;
        whatsappText: string;
        formTitle: string;
        formName: string;
        formNamePlaceholder: string;
        formPhone: string;
        formPhonePlaceholder: string;
        formMessage: string;
        formMessagePlaceholder: string;
        submitButton: string;
        successMessage: string;
        errorMessage: string;
    };
    footer: {
        brand: string;
        tagline: string;
        copyright: string;
    };
    seo: {
        title: string;
        description: string;
    };
}

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
    settings: Settings;
}

// ===== مسیر فایل دیتابیس =====
const dbPath = path.join(process.cwd(), 'data.json');

// ===== تنظیمات پیش‌فرض =====
function getDefaultSettings(): Settings {
    return {
        hero: {
            badge: '✦ تولیدی معتبر با بیش از یک دهه تجربه',
            title: 'مبل‌هایی برای ماندگاری در خاطره',
            highlight: 'مبل‌هایی',
            subtitle: 'اصالت سبز زمردی، شکوه طلایی. هر قطعه با عشق و ظرافت در کارگاه تک متولد می‌شود.',
            btnPrimary: 'مشاهده محصولات',
            btnSecondary: 'داستان ما',
        },
        about: {
            title: 'درباره تولیدی مبل تک',
            subtitle: 'کیفیت را با چشمانتان لمس کنید',
            description1: 'تولیدی مبل تک از سال ۱۳۸۵ با هدف احیای هنر نجاری و تولید مبلمانی با دوام و زیبا پا به عرصه گذاشت. نام «تک» نماد تعهد ما به تک‌تک محصولات و رضایت تک‌تک مشتریان است.',
            description2: 'ما در کارگاه خود از بهترین چوب‌های روسی و گردو، اسفنج‌های با دانسیته بالا و پارچه‌های درجه یک ایتالیایی و ترکیه‌ای استفاده می‌کنیم.',
            features: ['ضمانت ۵ ساله اسکلت چوبی', 'استفاده از چسب‌های صنعتی و بی‌بو', 'امکان سفارش در ابعاد و رنگ‌های دلخواه', 'ارسال به سراسر ایران'],
            imagePlaceholder: 'مبل تک',
        },
        contact: {
            title: 'ارتباط با ما',
            subtitle: 'همین حالا با ما تماس بگیرید یا فرم را پر کنید',
            supportTitle: '✨ پشتیبانی سریع',
            supportDesc: 'کارشناسان ما در اسرع وقت پاسخگوی شما هستند.',
            phone: '۰۲۱-۱۲۳۴۵۶۷۸',
            phoneHours: 'شنبه تا پنجشنبه ۹ تا ۱۸',
            address: 'تهران، جاده قدیم کرج، شهرک صنعتی، خیابان تولید، پلاک ۱۲',
            addressLabel: 'کارگاه تولیدی مبل تک',
            mobile: '۰۹۱۲-۳۴۵۶۷۸۹',
            mobileLabel: 'پشتیبانی واتساپ و تلگرام',
            whatsappText: '💬 گفتگو در واتساپ',
            formTitle: 'پیام خود را بنویسید',
            formName: 'نام و نام خانوادگی',
            formNamePlaceholder: 'مثال: علی محمدی',
            formPhone: 'شماره تماس',
            formPhonePlaceholder: '۰۹۱۲ ۳۴۵ ۶۷۸۹',
            formMessage: 'متن پیام',
            formMessagePlaceholder: 'نوع مبل، ابعاد موردنظر یا سوال خود را بنویسید...',
            submitButton: 'ارسال پیام ✦',
            successMessage: '✅ پیام شما با موفقیت ارسال شد!',
            errorMessage: '❌ خطا در ارسال پیام، لطفاً دوباره تلاش کنید.',
        },
        footer: {
            brand: 'تولیدی مبل تک',
            tagline: 'اصالت سبز زمردی، شکوه طلایی',
            copyright: '© ۱۴۰۴ تمامی حقوق برای تولیدی مبل تک محفوظ است.',
        },
        seo: {
            title: 'تولیدی مبل تک | اصالت و کیفیت',
            description: 'تولیدی مبل تک با بیش از یک دهه تجربه در تولید مبلمان کلاسیک و مدرن، با استفاده از بهترین چوب و پارچه‌های درجه یک.',
        },
    };
}

// ===== خواندن و نوشتن =====
export function readDB(): DB {
    if (!fs.existsSync(dbPath)) {
        const defaultDB: DB = {
            products: [],
            messages: [],
            settings: getDefaultSettings(),
        };
        fs.writeFileSync(dbPath, JSON.stringify(defaultDB, null, 2));
        return defaultDB;
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    const parsed = JSON.parse(data);

    // اگر ساختار قدیمی است و settings ندارد، آن را اضافه کن
    if (!parsed.settings) {
        parsed.settings = getDefaultSettings();
        fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2));
    }

    return parsed;
}

export function writeDB(data: DB): void {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// ===== توابع تنظیمات =====
export function getSettings(): Settings {
    return readDB().settings;
}

export function updateSettings(newSettings: Partial<Settings>): Settings {
    const db = readDB();
    db.settings = { ...db.settings, ...newSettings };
    writeDB(db);
    return db.settings;
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