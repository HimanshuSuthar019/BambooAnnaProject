import { useProducts } from "@/hooks/use-products";
import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDown, Check, Sprout, Heart, Recycle, Leaf } from "lucide-react";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bamboo-forest-heroSection.jpg"
            alt="Bamboo Forest"
            className="w-full h-full object-cover opacity-90"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/50 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white" style={{ animation: "slide-in-from-left-10 1s ease-out forwards" }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
              <Sprout className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium tracking-wide uppercase">100% Sustainable</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Sustainable Living, <br />
              <span className="text-green-300">Naturally.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
              Discover our collection of premium bamboo products designed for the eco-conscious home.
              Beautiful, durable, and kind to the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-green-500 hover:bg-green-400 text-white border-0 shadow-xl shadow-green-900/20">
                Explore Collection
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-white/5 border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                Our Story
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors">
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/30 relative">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/images/bambooCraftingImg.jpg.avif"
                alt="Crafting bamboo"
                className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-8 -right-8 p-8 bg-white rounded-2xl shadow-xl max-w-xs hidden md:block">
                <p className="font-bold text-4xl text-primary mb-2">10k+</p>
                <p className="text-muted-foreground">Trees planted through our partnership with global reforestation projects.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Rooted in Nature</h2>
                <div className="w-20 h-1 bg-primary rounded-full mb-6" />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At BambooAnna, we believe in the power of conscious consumption. Our journey began with
                  a simple question: "How can we reduce plastic without sacrificing style?"
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Bamboo is our answer. It's the fastest growing plant on Earth, requires no pesticides,
                  and regenerates from its own roots.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Recycle, title: "Zero Waste", desc: "Plastic-free packaging" },
                  { icon: Heart, title: "Ethically Made", desc: "Fair wages for artisans" },
                  { icon: Sprout, title: "Fast Growing", desc: "Harvested sustainably" },
                  { icon: Check, title: "Durable", desc: "Built to last years" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary h-fit">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Collection</h2>
            <p className="text-muted-foreground text-lg">Handcrafted essentials for a modern, sustainable lifestyle.</p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-secondary/20 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Table */}
      <section className="py-16 bg-white border-y border-border/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground">Detailed Inventory</h3>
            <p className="text-muted-foreground">Compare specifications and pricing</p>
          </div>
          <div className="rounded-xl border border-border overflow-hidden bg-background">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="w-[100px] font-bold">Image</TableHead>
                  <TableHead className="font-bold">Product Name</TableHead>
                  <TableHead className="font-bold hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right font-bold">Price</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">Loading inventory...</TableCell>
                  </TableRow>
                ) : (
                  products?.map((product) => (
                    <TableRow key={product.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell>
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-secondary/20" />
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground max-w-md truncate">
                        {product.description}
                      </TableCell>
                      <TableCell className="text-right font-mono">₹{product.price}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:text-primary">View</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-secondary/20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-foreground">Join the Movement</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're always looking for like-minded individuals to join our community. Whether you have
                a question about our products, want to collaborate, or just want to say hi — we'd love
                to hear from you.
              </p>
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold">@</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email Us</p>
                    <p className="text-muted-foreground">hello@bambooanna.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold">#</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Follow Us</p>
                    <p className="text-muted-foreground">@bambooanna_products</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">BambooAnna</span>
              </div>
              <p className="text-background/60 max-w-sm leading-relaxed">
                Crafting a sustainable future, one bamboo shoot at a time. Join us in making the world a greener place.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-primary">Shop</h4>
              <ul className="space-y-4 text-background/60">
                {["Kitchen", "Bathroom", "Lifestyle", "Accessories"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-primary">Company</h4>
              <ul className="space-y-4 text-background/60">
                <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/40">
            <p>&copy; 2024 BambooAnna Products. All rights reserved.</p>
            <p>Designed with <Heart className="w-4 h-4 inline mx-1 text-primary" /> for the planet</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
