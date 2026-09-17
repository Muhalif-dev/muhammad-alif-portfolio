type HeaderProps = {
  page?: 'home' | 'work'
}

function Header({ page = 'home' }: HeaderProps) {
  const isWorkPage = page === 'work'

  return (
    <header className="site-header">
      <nav aria-label="Primary navigation">
        <a
          className="nav-home"
          href={isWorkPage ? '/#home' : '#home'}
          aria-label="Muhammad Alif — Home"
        >
          <span className="nav-home__desktop">Muhammad Alif</span>
          <span className="nav-home__mobile" aria-hidden="true">
            Alif
          </span>
        </a>
        <a href={isWorkPage ? '/work' : '#selected-work'}>Work</a>
        <a href={isWorkPage ? '/#about' : '#about'}>About</a>
        <a href={isWorkPage ? '/#contact' : '#contact'}>Contact</a>
      </nav>
    </header>
  )
}

export default Header
