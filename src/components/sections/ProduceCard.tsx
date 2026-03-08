import React from 'react';
import { Leaf, DollarSign, Store, Clock, Award } from 'lucide-react';
import Image from 'next/image';

interface ProduceCardProps {
    id: string;
    name: string;
    farmerName: string;
    location: string;
    price: number;
    grade: 'A' | 'B' | 'C';
    quantity: number;
    unit: string;
    harvestDate: string;
    imageUrl?: string;
}

const gradeColors = {
    A: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800',
    B: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800',
    C: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800',
};

const gradeLabels = {
    A: 'Premium Export',
    B: 'Standard Retail',
    C: 'Processing Grade',
};

export function ProduceCard({
    id,
    name,
    farmerName,
    location,
    price,
    grade,
    quantity,
    unit,
    harvestDate,
    imageUrl,
}: ProduceCardProps) {
    return (
        <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={`Fresh ${name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Leaf className="w-12 h-12 text-gray-300 dark:text-gray-700" />
                    </div>
                )}
                
                {/* AI Grade Badge */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 pointer-events-none">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border ${gradeColors[grade]} backdrop-blur-md bg-opacity-90`}>
                        <Award className="w-3.5 h-3.5" />
                        Grade {grade}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <Store className="w-4 h-4" />
                            {farmerName} &bull; {location}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-4 mb-5 text-sm">
                    <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">Available</span>
                        <span className="font-medium text-gray-900 dark:text-white">{quantity} {unit}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">AI Assessment</span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize truncate max-w-[120px]" title={gradeLabels[grade]}>
                            {gradeLabels[grade]}
                        </span>
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">AISP Price</span>
                        <div className="flex items-end gap-1">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                                ₹{price.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">/{unit}</span>
                        </div>
                    </div>
                    
                    <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium rounded-xl transition-colors shadow-sm shadow-green-600/20 hover:shadow-green-600/40">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
