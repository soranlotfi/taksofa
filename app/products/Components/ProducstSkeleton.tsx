export default function ProductsSkeleton() {
    return (
        <section className="py-20 bg-cream">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <div className="h-12 w-64 rounded-lg bg-gray-200 animate-pulse" />
                        <div className="h-6 w-48 rounded-lg bg-gray-200 animate-pulse mt-4" />
                    </div>
                    <div className="h-10 w-40 rounded-full bg-gray-200 animate-pulse mt-4 md:mt-0" />
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 w-20 rounded-full bg-gray-200 animate-pulse" />
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-50">
                            <div className="h-56 bg-gray-200 animate-pulse" />
                            <div className="p-6 space-y-3">
                                <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
                                <div className="flex gap-4">
                                    <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                                    <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                                </div>
                                <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                                <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
                                <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}