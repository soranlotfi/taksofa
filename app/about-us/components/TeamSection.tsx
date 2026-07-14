"use client";

// ===== تعریف نوع برای هر عضو تیم =====
interface TeamMember {
    name: string;
    role: string;
    image?: string;
    bio?: string;
}

// ===== تعریف نوع Props =====
interface TeamSectionProps {
    members: TeamMember[];
    title?: string;
    subtitle?: string;
}

export default function TeamSection({
                                        members,
                                        title = "افراد کلیدی",
                                        subtitle = "متخصصانی که پشت هر محصول مبل تک ایستاده‌اند",
                                    }: TeamSectionProps) {
    if (!members || members.length === 0) {
        return (
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <p className="text-gray-400">هیچ عضوی برای نمایش وجود ندارد.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <span className="text-emerald-600 font-semibold text-sm tracking-widest">✦ تیم ما</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mt-2">
                         <span className="text-gold">{title}</span>
                    </h2>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mt-3" />
                    <p className="text-gray-500 mt-4">{subtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-3xl p-6 text-center border border-gray-100 hover:shadow-md transition hover:-translate-y-1"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-600 text-3xl font-bold mx-auto mb-4">
                                {member.name.charAt(0)}
                            </div>
                            <h4 className="text-lg font-bold text-emerald-800">{member.name}</h4>
                            <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}