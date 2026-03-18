export function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-serif text-2xl tracking-wide text-foreground">MedLink</p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MedLink. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
