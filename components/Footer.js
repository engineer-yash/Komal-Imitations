import Link from 'next/link';

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP;

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-playfair font-bold text-primary mb-4">Komal Jewellery</h3>
            <p className="text-sm text-muted-foreground">
              Timeless elegance, everyday luxury
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Products</Link></li>
              <li><Link href="/catalog" className="text-muted-foreground hover:text-primary">Catalog</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Raviwar Peth, Pune</li>
              <li>Maharashtra 411002</li>
              <li>
                <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`} className="hover:text-primary">
                  {whatsappNumber}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-sm text-muted-foreground">
              Open Daily<br />
              9:00 AM - 9:00 PM
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Komal Imitation Jewellery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
