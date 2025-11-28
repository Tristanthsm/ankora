export type PriceRange = {
    label: string
    value: string
    min?: number
    max?: number
}

export type FilterOption = {
    label: string
    value: string
}

export const countryOptions: FilterOption[] = [
    { label: 'Tous les pays', value: 'all' },
    { label: 'France', value: 'France' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Allemagne', value: 'Allemagne' },
    { label: 'Japon', value: 'Japon' },
    { label: 'Portugal', value: 'Portugal' },
    { label: 'Royaume-Uni', value: 'UK' }
]

export const languageOptions: FilterOption[] = [
    { label: 'Toutes les langues', value: 'Toutes' },
    { label: 'Français', value: 'Français' },
    { label: 'Anglais', value: 'Anglais' },
    { label: 'Allemand', value: 'Allemand' },
    { label: 'Japonais', value: 'Japonais' },
    { label: 'Espagnol', value: 'Espagnol' },
    { label: 'Portugais', value: 'Portugais' }
]

export const priceRanges: PriceRange[] = [
    { label: '< 50€', value: 'lt50', max: 50 },
    { label: '50€ – 80€', value: '50-80', min: 50, max: 80 },
    { label: '80€ – 120€', value: '80-120', min: 80, max: 120 },
    { label: '> 120€', value: 'gt120', min: 120 }
]

export const experienceRanges: FilterOption[] = [
    { label: 'Toutes les expériences', value: 'all' },
    { label: '0–3 ans', value: '0-3' },
    { label: '3–7 ans', value: '3-7' },
    { label: '7+ ans', value: '7+' }
]

export const expertiseFilters = ['Tous', 'Tech', 'Product', 'Design', 'Marketing', 'Data'] as const
