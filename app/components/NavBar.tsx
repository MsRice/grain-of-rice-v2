export default function NavBar() {
  return (
    <nav className="h-[10vh] w-full bg-transparent absolute top-0 z-10 flex items-center justify-center">
      <ul className="flex gap-8 text-white/90 font-medium text-sm tracking-wide">
        <li>
          <a href="#projects" className="hover:text-gor-yellow transition-colors">
            Projects
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-gor-yellow transition-colors">
            About
          </a>
        </li>
        <li>
          <a href="/patricemaxwell" className="hover:text-gor-yellow transition-colors">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
