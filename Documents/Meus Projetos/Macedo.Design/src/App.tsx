import { useEffect, useRef, useState } from 'react'

const whatsappNumber = '+55 11 91313-5165'
const whatsappLink = 'https://wa.me/5511913135165'
const emailAddress = 'letschat@macedo.design'

type Locale = 'en' | 'pt'

type Copy = {
  nav: Array<{ label: string; href: string }>
  heroTitle: string
  aboutHeading: string
  aboutParagraphs: string[]
  projectsHeading: string
  projectsIntro: string
  projectsItems: Array<{ title: string; description: string }>
  contactHeading: string
  contactIntro: string
  contactLabels: {
    whatsapp: string
    email: string
  }
}

const translations: Record<Locale, Copy> = {
  en: {
    nav: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    heroTitle: 'Interfaces that welcome, guide, and create value for businesses and people.',
    aboutHeading: 'About me',
    aboutParagraphs: [
      'I work as a product and interface designer, creating functional and accessible digital products that respond to real human needs. My front-end experience helps me propose feasible solutions from day one, reducing rework and aligning design with implementation.',
      'My background bridges technology and communication. I first studied Information Systems at UFPA, then shifted to Advertising where I deepened art direction and visual creation.',
      "Long before that, as a kid, I was already experimenting with design without realising it—tweaking layouts and colours on my Pokémon blog and discovering how enjoyable crafting visual experiences could be.",
      'I have also led infrastructure and IT teams, which shaped how I work today: combining visual clarity, technical understanding, and a strong product mindset.',
    ],
    projectsHeading: 'Featured projects',
    projectsIntro:
      'Every project balances strategic clarity with a precise visual approach. These case studies show how I turn insights into complete digital experiences that connect brand, product, and people.',
    projectsItems: [
      {
        title: 'Encibra',
        description:
          'Full digital repositioning for an engineering company, strengthening credibility and scalability across multiple touchpoints.',
      },
      {
        title: 'Vision360',
        description:
          'Data-visualisation platform focused on usability, advanced prototyping, and a clear narrative for decision makers.',
      },
      {
        title: 'Receita Fácil',
        description:
          'Mobile-first experience that helps busy people adopt healthier eating habits through an intuitive journey.',
      },
    ],
    contactHeading: 'Get in touch',
    contactIntro: 'You can reach me through the channels below. I will get back to you as soon as possible.',
    contactLabels: {
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
  },
  pt: {
    nav: [
      { label: 'Início', href: '#home' },
      { label: 'Sobre', href: '#about' },
      { label: 'Projetos', href: '#projects' },
      { label: 'Contato', href: '#contact' },
    ],
    heroTitle: 'Interfaces que acolhem, orientam e criam valor para negócios e pessoas.',
    aboutHeading: 'Sobre mim',
    aboutParagraphs: [
      'Atuo como designer de produto e interface, criando produtos digitais funcionais, acessíveis e orientados às necessidades das pessoas. Minha experiência com desenvolvimento front-end me ajuda a propor soluções viáveis desde o início, reduzindo retrabalhos e aproximando design e implementação.',
      'Minha formação combina tecnologia e comunicação. Iniciei Sistemas de Informação na UFPA, mas encontrei meu foco em Comunicação Social – Publicidade e Propaganda, onde aprofundei direção de arte e criação visual.',
      'Antes disso, ainda criança, eu já explorava design sem perceber, ajustando layouts e testando cores no meu blog de Pokémon. Foi ali que descobri o prazer de criar experiências visuais.',
      'Também passei pela área de tecnologia como gerente de infraestrutura de redes e gestor de TI, liderando equipes e projetos técnicos. Essa vivência define muito de como trabalho hoje: unir clareza visual, compreensão técnica e experiência de produto.',
    ],
    projectsHeading: 'Projetos em destaque',
    projectsIntro:
      'Cada projeto que desenvolvo equilibra clareza estratégica e uma abordagem visual precisa. Aqui reúno estudos de caso que mostram como transformo insights em experiências digitais completas, conectando marca, produto e pessoas.',
    projectsItems: [
      {
        title: 'Encibra',
        description:
          'Reposicionamento digital completo para uma empresa de engenharia, reforçando credibilidade e escalabilidade em múltiplos pontos de contato.',
      },
      {
        title: 'Vision360',
        description:
          'Plataforma de visualização de dados com foco em usabilidade, prototipação avançada e narrativa clara para quem decide.',
      },
      {
        title: 'Receita Fácil',
        description:
          'Experiência mobile-first que conecta alimentação saudável a uma jornada intuitiva para pessoas ocupadas.',
      },
    ],
    contactHeading: 'Fale comigo',
    contactIntro: 'Você pode falar comigo pelos canais abaixo. Responderei assim que possível.',
    contactLabels: {
      whatsapp: 'Whatsapp',
      email: 'E-mail',
    },
  },
}

const detectLocale = (): Locale => {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  const match = candidates.find((lang) => lang?.toLowerCase().startsWith('pt'))
  return match ? 'pt' : 'en'
}

function App() {
  const [locale, setLocale] = useState<Locale>(() => detectLocale())
  const [aboutVisible, setAboutVisible] = useState(false)
  const aboutSectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  useEffect(() => {
    const target = aboutSectionRef.current
    if (!target || aboutVisible || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [aboutVisible])

  useEffect(() => {
    const handleLanguageChange = () => setLocale(detectLocale())

    if (typeof window !== 'undefined') {
      window.addEventListener('languagechange', handleLanguageChange)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('languagechange', handleLanguageChange)
      }
    }
  }, [])

  const copy = translations[locale]
  const handleAboutLinkActivate = () => setAboutVisible(true)

  return (
    <div className="page">
      <header className="hero" role="banner" id="home">
        <div className="brand" role="heading" aria-level={1}>
          MACEDO<span className="dot">.</span>DESIGN
        </div>

        <div className="hero-content" aria-live="polite">
          <h1 className="section-title">{copy.heroTitle}</h1>
        </div>
      </header>

      <section
        className={`about-body ${aboutVisible ? 'is-visible' : 'is-hidden'}`}
        id="about"
        aria-labelledby="about-heading"
        aria-hidden={!aboutVisible}
        ref={aboutSectionRef}
      >
        <h2 id="about-heading" className="section-heading">
          {copy.aboutHeading}
        </h2>
        {copy.aboutParagraphs.map((paragraph, index) => (
          <p key={`about-${index}`}>{paragraph}</p>
        ))}
      </section>

      <section
        className="projects-body"
        id="projects"
        aria-labelledby="projects-heading"
      >
        <h2 id="projects-heading" className="section-heading">
          {copy.projectsHeading}
        </h2>
        <p>{copy.projectsIntro}</p>
        <ul className="project-list">
          {copy.projectsItems.map(({ title, description }) => (
            <li key={title}>
              <strong>{title}</strong> — {description}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="contact-body"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className="section-heading">
          {copy.contactHeading}
        </h2>
        <p>{copy.contactIntro}</p>
        <p>
          {copy.contactLabels.whatsapp}:{' '}
          <a href={whatsappLink} target="_blank" rel="noreferrer">
            {whatsappNumber}
          </a>
        </p>
        <p>
          {copy.contactLabels.email}:{' '}
          <a href={`mailto:${emailAddress}`} target="_blank" rel="noreferrer">
            {emailAddress}
          </a>
        </p>
      </section>

      <div className="side-nav-rail">
        <nav className="side-nav" aria-label="Primary">
          <ul>
            {copy.nav.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={href === '#about' ? handleAboutLinkActivate : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default App
