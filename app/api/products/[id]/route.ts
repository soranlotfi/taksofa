import { NextResponse } from 'next/server';
import { getProductBySlug, updateProduct, deleteProduct } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const product = getProductBySlug(params.slug);
        if (!product) {
            return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'خطا در دریافت محصول' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const body = await request.json();
        const product = getProductBySlug(params.slug);
        if (!product) {
            return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
        }
        const updated = updateProduct(product.id, body);
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'خطا در ویرایش محصول' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const product = getProductBySlug(params.slug);
        if (!product) {
            return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
        }
        deleteProduct(product.id);
        return NextResponse.json({ message: 'محصول حذف شد' });
    } catch (error) {
        return NextResponse.json({ error: 'خطا در حذف محصول' }, { status: 500 });
    }
}