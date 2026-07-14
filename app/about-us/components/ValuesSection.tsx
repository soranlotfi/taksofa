import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

interface ValuesSectionProps {
    values: string[]
}

export default function ValuesSection({values}: ValuesSectionProps){
    return (
        <section className="py-16 md:py-20 bg-emerald-50/30">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <span className="text-emerald-600 font-semibold text-sm tracking-widest">✦ ارزش‌ها</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mt-2">
                        با <span className="text-gold">این ارزش‌ها</span> پیش می‌رویم
                    </h2>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mt-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-3 hover:shadow-md transition hover:-translate-y-1"
                        >
                            <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}