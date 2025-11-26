export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white shadow-md">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo Ankora Global Connect" className="h-8" />
        <span className="font-bold text-blue-700">ANKORA Global Connect</span>
      </div>
      <nav>
        <ul className="flex gap-8 text-gray-700 font-medium">
          <li>À propos</li>
          <li>Comment ça marche</li>
          <li>Devenir mentor</li>
          <li>FAQ</li>
        </ul>
      </nav>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 border rounded-md">Connexion</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Créer un compte</button>
      </div>
    </header>
  )
}
