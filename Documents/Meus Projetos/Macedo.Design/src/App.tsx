import { useState } from 'react'

const links = ['Home', 'About', 'Projects', 'Contact']

const navSectionMap = {
  home: 'home',
  about: 'about',
  contact: 'contact',
} as const

type Section = (typeof navSectionMap)[keyof typeof navSectionMap]

const introText =
  'Sou designer multidisciplinar com foco em experiências digitais elegantes, acessíveis e repletas de propósito.'

const aboutText = `Ao longo da última década, ajudei equipes a transformar ideias nebulosas em produtos digitais claros,
consistentes e desejáveis. Minha abordagem combina pesquisa, estratégia e um olhar minucioso para detalhes que fazem diferença na jornada de quem utiliza uma interface. Gosto de colaborar desde a fase de descoberta, aproximando pessoas usuárias e negócios através de protótipos, testes e iterações contínuas.`

const whatsappNumber = '+55 11 91313-5165'
const whatsappLink = 'https://wa.me/5511913135165'
const emailAddress = 'letschat@macedo.design'

const isSectionKey = (value: string): value is keyof typeof navSectionMap =>
  Object.prototype.hasOwnProperty.call(navSectionMap, value)

const getSectionFromLabel = (label: string): Section | null => {
  const key = label.toLowerCase()
  return isSectionKey(key) ? navSectionMap[key] : null
}

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')

  const handleNavClick = (label: string) => {
    const section = getSectionFromLabel(label)
    if (section) {
      setActiveSection(section)
    }
  }

  return (
    <div className={`page ${activeSection}`}>
      <main className="hero" role="banner">
        {activeSection === 'home' ? (
          <h1>MACEDO.DESIGN</h1>
        ) : activeSection === 'about' ? (
          <>
            <h1>Prazer, eu sou Rodrigo.</h1>
            <p className="intro">{introText}</p>
          </>
        ) : (
          <h1>Como falar comigo?</h1>
        )}
      </main>

      {activeSection === 'about' && (
        <section className="about-body">
          <p>{aboutText}</p>
        </section>
      )}

      {activeSection === 'contact' && (
        <section className="contact-body">
          <p>
            Whatsapp:{' '}
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              {whatsappNumber}
            </a>
            <br />
            E-mail:{' '}
            <a href={`mailto:${emailAddress}`} target="_blank" rel="noreferrer">
              {emailAddress}
            </a>
          </p>
        </section>
      )}

      <nav className="side-nav" aria-label="Primary">
        <ul>
          {links.map((label) => {
            const section = getSectionFromLabel(label)
            const isActive = section === activeSection

            return (
              <li key={label}>
                <button
                  type="button"
                  className={isActive ? 'active' : ''}
                  onClick={() => handleNavClick(label)}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default App
