import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { Heart, Shield, Award, Users, Mail, Phone, Instagram, Facebook, MapPin } from "lucide-react";

const About = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 84349 03291", "+91 74818 80404"],
      action: "tel:+918434903291",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["thevolvoro@gmail.com"],
      action: "mailto:thevolvoro@gmail.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Delhi, India"],
      action: null as string | null,
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/volvoro_tour_explorer/?utm_source=ig_web_button_share_sheet",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/share/173W9x9HXv/",
    },
  ];
  const values = [
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "We curate genuine, memorable journeys that connect you with local culture and beauty.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Your comfort and security are our top priorities on every trip.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We maintain the highest standards in accommodations, transport, and service.",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Our experienced trip captains ensure smooth, hassle-free experiences.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            About Volvoro Tour Explorer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Redefining travel with comfort, authenticity, and premium experiences
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Volvoro Tour Explorer is built on one simple idea — travel should be effortless, 
              authentic, and unforgettable. We believe in creating journeys that go beyond 
              destinations, crafting experiences that stay with you long after you return home.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              From the misty mountains of Manali to the golden dunes of Jaisalmer, we handle 
              every detail so you can live the journey. Our commitment to honesty, comfort, 
              and premium service ensures that every trip with Volvoro is nothing short of extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            To make premium travel accessible, comfortable, and memorable for every traveler. 
            Whether you're exploring with family, celebrating with your partner, or discovering 
            yourself solo — we're here to make your journey extraordinary.
          </p>
        </motion.div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dedicated team of travel enthusiasts and experts work tirelessly to create unforgettable experiences for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Founder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src="/images/destinations/ayush.jpg" 
                  alt="Ayush Singh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0iI2QwZDRlYSI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0OHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iMDAwMDAwIj5BUzwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Ayush Singh</h3>
              <p className="text-sm text-primary mb-3 font-medium">Founder</p>
              <p className="text-sm text-muted-foreground">
                A dedicated entrepreneur with a passion for creating exceptional travel experiences and building successful businesses.
              </p>
            </motion.div>

            {/* CEO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20 relative">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <img 
                      src="/images/destinations/puja .jpg" 
                      alt="Puja Singh"
                      className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0iI2QwZDRlYSI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0OHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iMDAwMDAwIj5QPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Puja Singh</h3>
              <p className="text-sm text-primary mb-3 font-medium">Chief Executive Officer</p>
              <p className="text-sm text-muted-foreground">
                Leading our vision and strategic direction to create exceptional travel experiences.
              </p>
            </motion.div>

            {/* MD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center text-4xl font-bold text-primary">
                PK
              </div>
              <h3 className="text-xl font-semibold mb-1">Priya Kapoor</h3>
              <p className="text-sm text-primary mb-3 font-medium">Managing Director</p>
              <p className="text-sm text-muted-foreground">
                Ensuring operational excellence and exceptional service delivery across all our tours.
              </p>
            </motion.div>

            {/* Tech Head */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src="/images/destinations/aadarsh.jpg" 
                  alt="Aadarsh Kumar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0iI2QwZDRlYSI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0OHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iMDAwMDAwIj5BSzwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Aadarsh Kumar</h3>
              <p className="text-sm text-primary mb-3 font-medium">Technology Head</p>
              <p className="text-sm text-muted-foreground">
                Leading our digital transformation and creating seamless booking experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods (from Contact page) */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <method.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-xl font-semibold">{method.title}</h3>
              <div className="space-y-2">
                {method.details.map((detail) => (
                  <p key={detail} className="text-muted-foreground">
                    {method.action ? (
                      <a href={method.action as string} className="hover:text-primary transition-colors">
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Media (from Contact page) */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-3xl font-bold"
          >
            Follow Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA (from Contact page) */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-secondary/10 p-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Click the WhatsApp button below to connect with our travel experts instantly!
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=918434903291"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-8 py-3 font-semibold text-white transition-shadow hover:shadow-xl"
          >
            <Phone className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </section>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default About;
