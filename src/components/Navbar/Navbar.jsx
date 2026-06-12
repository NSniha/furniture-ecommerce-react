import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = ["HOME", "ABOUT", "SHOP", "CONTACT US"];

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex h-[90px] w-full max-w-[1720px] items-center justify-between px-6 text-white sm:px-10 lg:px-12 xl:px-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full bg-white"></div>
            <div className="absolute right-[-2px] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-[#6f5135]"></div>
          </div>

          <span className="text-[26px] font-medium tracking-[0.06em] sm:text-[31px] lg:text-[34px]">
            DECORIST
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-12 lg:flex">
          <ul className="flex items-center gap-12">
            {navLinks.map((item, index) => (
              <li key={item}>
                <a
                  href="#"
                  className={`text-[15px] font-medium tracking-[0.06em] transition duration-300 hover:text-white ${
                    index === 0 ? "text-white" : "text-white/65"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-8 w-px bg-white/45"></div>

          <div className="flex items-center gap-8">
            <button className="transition duration-300 hover:scale-110">
              <Search size={27} strokeWidth={1.7} />
            </button>

            <button className="transition duration-300 hover:scale-110">
              <ShoppingCart size={29} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-md lg:hidden"
        >
          <Menu size={25} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-[78%] max-w-[340px] bg-[#4b3423] px-7 py-7 shadow-2xl transition duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-12 flex items-center justify-between">
            <span className="text-2xl font-medium tracking-[0.06em]">
              DECORIST
            </span>

            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
            >
              <X size={22} />
            </button>
          </div>

          <ul className="space-y-7">
            {navLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block text-lg font-medium tracking-[0.08em] text-white/80 transition hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex gap-5">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Search size={23} />
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;