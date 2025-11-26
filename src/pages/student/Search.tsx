import { useMemo, useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { mentors } from '../../data/mock'

export default function StudentSearchPage() {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('')

  const filtered = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesQuery = query
        ? mentor.name.toLowerCase().includes(query.toLowerCase()) ||
          mentor.expertise.some((area) => area.toLowerCase().includes(query.toLowerCase()))
        : true
      const matchesCountry = country ? mentor.country.toLowerCase().includes(country.toLowerCase()) : true
      const matchesLanguage = language
        ? mentor.languages.some((lang) => lang.toLowerCase().includes(language.toLowerCase()))
        : true
      return matchesQuery && matchesCountry && matchesLanguage
    })
  }, [country, language, query])

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Recherche"
        title="Filtrez vos mentors"
        description="Combinaison de filtres par pays, expertise, disponibilité et langues pour un matching pertinent."
        align="left"
      />

      <Card>
        <div className="grid md:grid-cols-4 gap-4">
          <Input label="Nom ou expertise" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Input label="Pays" value={country} onChange={(e) => setCountry(e.target.value)} />
          <Input label="Langue" value={language} onChange={(e) => setLanguage(e.target.value)} />
          <div className="flex items-end">
            <Button className="w-full">Appliquer</Button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((mentor) => (
          <Card key={mentor.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{mentor.name}</p>
                <p className="text-sm text-gray-600">{mentor.title}</p>
              </div>
              <Badge color="primary">{mentor.country}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">{mentor.languages.join(' · ')}</p>
            <p className="text-gray-700 mt-3">{mentor.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {mentor.expertise.map((area) => (
                <Badge key={area} color="muted">{area}</Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
              <span>{mentor.rating}★</span>
              <Button size="sm">Contacter ce mentor</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
