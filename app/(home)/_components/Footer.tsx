import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t text-black text-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          Made with &#10084; by <Link href="https://github.com/thuee-mong-marma" className="font-semibold hover:underline">Mong</Link>
        </div>
        <p>© {new Date().getFullYear()} TaskR. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
