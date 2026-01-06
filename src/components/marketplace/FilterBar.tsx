import React from 'react'
import { Search, SlidersHorizontal, Check } from 'lucide-react'
import { countryOptions, expertiseFilters, priceRanges } from '../../config/filters'

interface FilterBarProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    countryFilter: string
    setCountryFilter: (value: string) => void
    priceRange: string
    setPriceRange: (value: string) => void
    expertiseFilter: string
    setExpertiseFilter: (value: string) => void
    showAdvanced: boolean
    setShowAdvanced: (value: boolean) => void
    onReset: () => void
}

export function FilterBar({
    searchTerm,
    setSearchTerm,
    countryFilter,
    setCountryFilter,
    priceRange,
    setPriceRange,
    expertiseFilter,
    setExpertiseFilter,
    showAdvanced,
    setShowAdvanced,
    onReset
}: FilterBarProps) {
    return (
        <div className="relative z-30 w-full space-y-4">
            {/* Main Search Bar */}
            <div className="relative flex w-full items-center rounded-2xl bg-white p-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un mentor, une compétence, une ville..."
                        className="h-12 w-full border-none bg-transparent pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Divider Line */}
                <div className="h-8 w-px bg-gray-100 mx-2 hidden md:block"></div>

                {/* Quick Filters - Desktop */}
                <div className="hidden md:flex items-center gap-2 pr-2">
                    <select
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                        className="h-9 rounded-lg border-none bg-gray-50 py-0 pl-3 pr-8 text-sm font-medium text-gray-600 focus:ring-0 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        {countryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`ml-2 flex h-11 w-11 items-center justify-center rounded-xl transition-all ${showAdvanced ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <SlidersHorizontal className="h-5 w-5" />
                </button>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvanced && (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Expertise */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Expertise</label>
                            <div className="flex flex-wrap gap-2">
                                {expertiseFilters.map((exp) => (
                                    <button
                                        key={exp}
                                        onClick={() => setExpertiseFilter(exp)}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors border ${expertiseFilter === exp
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {exp}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Tarif</label>
                            <div className="flex flex-col gap-2">
                                {priceRanges.map((range) => (
                                    <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${priceRange === range.value ? 'bg-blue-600 border-blue-600' : 'border-gray-200 bg-white group-hover:border-gray-300'}`}>
                                            {priceRange === range.value && <Check className="h-3.5 w-3.5 text-white" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="price"
                                            value={range.value}
                                            checked={priceRange === range.value}
                                            onChange={(e) => setPriceRange(e.target.value)}
                                            className="hidden"
                                        />
                                        <span className="text-sm text-gray-600">{range.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col justify-end gap-3">
                            <button
                                onClick={onReset}
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4"
                            >
                                Réinitialiser tous les filtres
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
