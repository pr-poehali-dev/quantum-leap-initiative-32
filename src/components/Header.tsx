import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <a href="/" className="font-serif text-2xl tracking-wide text-foreground">
            MedLink
          </a>

          <div className="hidden md:flex items-center gap-12">
            <a
              href="#services"
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              Функции
            </a>
            <a
              href="#philosophy"
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              О нас
            </a>
            <a
              href="#process"
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              Как работает
            </a>
            <a
              href="#contact"
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              Поддержка
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Открыть меню"
          >
            <span
              className={`block w-6 h-px bg-foreground transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isMenuOpen ? "max-h-64 pb-8" : "max-h-0"}`}
        >
          <div className="flex flex-col gap-6 pt-4">
            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Функции
            </a>
            <a
              href="#philosophy"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              О нас
            </a>
            <a
              href="#process"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Как работает
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Поддержка
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}