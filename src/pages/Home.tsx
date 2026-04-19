import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Settings,
  MessageCircle,
  CheckCircle2,
  Zap,
  BadgeCheck,
  Award,
  ArrowRight,
  Globe,
  Share2,
  Users,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(27,28,29,0.04)] h-16 flex justify-between items-center px-6 md:px-8 transition-all duration-300">
    <div className="flex items-center gap-8">
      <span className="text-xl font-bold tracking-tighter text-on-surface font-headline">
        UptoHack
      </span>
    </div>
    <div className="flex items-center gap-4">
      <Link to="/login" className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden hover:ring-2 hover:ring-primary transition-all">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8lsF7EjahYQvzMul7Z0r2GeyQlpvZCf_SR0R8foON7kwsJ8aoAFX45_94TM2TJrADixtJ18B419bxaDIu9C_4mMh8ugDCgXjqXpZQCDsRDZ3JnCBahEvuEzaGTZ7ckPYZfePRYbZ1IWadAzmtycVkuKblaW6F9YdMYAKzAeOjJz_OPYIqeuzcNKrc3a_UkSOu4BH9YJPcW1DH_F3NI6NHW00gUKR8zobwV4_ujqHOytWIa67JG2YTIK6fxWc4L19xZ63OiJCh131o"
          alt="Login / Signup"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[120px]"></div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 max-w-5xl w-full text-center space-y-8"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low text-primary text-xs font-label uppercase tracking-widest font-bold">
        <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
        Live Events Everywhere
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9]">
        Build <span className="text-primary italic">Communities</span>. <br />
        Host <span className="font-light">Events</span>. <br />
        Connect <span className="bg-primary text-on-primary px-4 py-1 rounded-xl inline-block mt-2 md:mt-0">Instantly</span>.
      </h1>
      <p className="max-w-xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed">
        The elite ecosystem for modern event organizers and high-impact communities. Sophisticated tools, seamless integration, effortless growth.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to="/login" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-95 transition-all duration-300 inline-block">
          Go to Dashboard
        </Link>
        <Link to="/feed" className="bg-surface-container-highest text-primary px-8 py-4 rounded-xl font-semibold hover:bg-surface-container-low transition-all duration-300 inline-block">
          Explore Communities
        </Link>
      </div>
    </motion.div>
  </section>
);

const BentoGrid = () => (
  <section className="max-w-7xl mx-auto px-6 py-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-16"
    >
      <span className="font-label text-xs uppercase tracking-[0.2em] text-outline">Capabilities</span>
      <h2 className="text-4xl font-semibold tracking-tight text-on-surface mt-2">Engineered for connection</h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* WhatsApp Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="md:col-span-8 bg-surface-container-low rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden group"
      >
        <div className="flex-1 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <MessageCircle className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold text-on-surface">WhatsApp First</h3>
          <p className="text-on-surface-variant leading-relaxed">
            Automate community updates and event reminders directly through the world's most popular messaging app. No more missed emails.
          </p>
          <ul className="space-y-3 pt-4">
            <li className="flex items-center gap-2 text-sm text-on-surface">
              <CheckCircle2 className="text-primary w-5 h-5" />
              Instant RSVP via Chat
            </li>
            <li className="flex items-center gap-2 text-sm text-on-surface">
              <CheckCircle2 className="text-primary w-5 h-5" />
              Group Auto-Management
            </li>
          </ul>
        </div>
        <div className="flex-1 relative translate-y-8 group-hover:translate-y-4 transition-transform duration-500">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQa6S4oVS7_4qAShBFWwjl1rh48k198l9NkfoYDFbyNxeeiTxE3t7I_tieo8FbfHViyLnErJRuP4o__tj7We8GAyWdRHpVMYraLGB2tvOcbLl7o91D-hEJPW8Ppl2zbbOGyGe3Ov4tYnY5vdI9VkcV50A3DGE6KqVucnf3lSzPEBsNjJ3jb9K-FGzXft9rmZ1TIgDObIXO7G8fBAxfM0Z8lRqPGUiMVFLqfDnFrQcZ24smKTeCDsJcsfMrN8dF00EAFpvpASzKt85T"
            alt="Interface preview"
            className="rounded-2xl shadow-2xl rotate-2 object-cover"
          />
        </div>
      </motion.div>

      {/* Quick Meet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="md:col-span-4 bg-surface-container-lowest rounded-3xl p-8 space-y-6 shadow-sm flex flex-col justify-between border border-outline-variant/10"
      >
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Zap className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold text-on-surface">Quick Meet</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Spin up impromptu networking sessions with zero friction. One link, instant face-to-face.
          </p>
        </div>
        <div className="flex -space-x-3 pt-4">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPRpXCcjUcWsjus0s93OWH04XBwErzEWPU6RnF_x6S_Bvrk86P6vRNRwE7dqmTkWb-0BC0LIQDASSKxugicVZ7hsGVNGitdRiBrnPm3aoE5mhOdjGWVRI9mWJXrLT7MOii8bgBYt-1ddTmw5biaTIqeSCU-kGOmH5pacMripYn9koYqNmi-8ZMvogLP1dZZbJOJAv0oR73s62jX47ULZKkyN77TkUaRyXwk9pRC6DAoXem4gMPLs8XvbFMy_J4XDRxxkgf8pss8O8-" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhoBYo6_E99LSlc2KRDC_4dto6huzN77Q2Z2Bcd2KiBUaE65vNnKSa9sbcPpupQaP8eQuYzCOoMcBPy2lyOitI9tO-w2zhdaavyd60qYotpBQnzfua2z1gAGM4N38udBzTRLG4btoNYEWMDLyUfpcvb7NTTWlswCRvnGWlnU39IPezQESQ994aL7J3KY7JxDdlsusZLAfvKWEKGU_U_0Mcetes9xJYTqFADGUpjuR3MQbH3IyY2Uwp8BIFjuFWi9aYT_l0IM9mTj_7" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg-FLDCi1ZFjZnZRfq4HJd7X2jdBiCG9cG2l-fT2iQlCtRxQ4nPYvQQwvWAl-yDVcqGf3bjYUfkXIc6NW_-VHvYYlJA4q8l91clBIzr3JuSzssQsT5QWHN2GIj9opjglPJjKOmb6ZaYBjpLlDP9LSMePx3-hXqLIurKP9mwD3LWJArXaH6n6tUcQbOWN04k3RNVv5sBThiTtAaZNbT4H1s3vJ8oqkmyl7B1JXKh6x4gaWSn7J526FGcCIrgmHcZk4a4ZJ21yySVMnV" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
          <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface">
            +12
          </div>
        </div>
      </motion.div>

      {/* Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="md:col-span-4 bg-[#1b1c1d] rounded-3xl p-8 text-white space-y-6"
      >
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <BadgeCheck className="text-tertiary-fixed w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold">Smart Certificates</h3>
          <p className="text-surface-dim text-sm leading-relaxed">
            Issue blockchain-verified certificates of attendance automatically upon event completion.
          </p>
        </div>
        <div className="h-32 bg-white/5 rounded-2xl border border-white/10 p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-3 right-3 opacity-20">
            <Award className="w-10 h-10" />
          </div>
          <div>
            <div className="text-[10px] font-label uppercase tracking-widest text-white/40">Certification of Excellence</div>
            <div className="text-sm font-semibold mt-1">Community Growth Summit '24</div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-1 w-24 bg-primary rounded-full"></div>
            <div className="text-[10px] text-primary font-bold tracking-wider">VERIFIED</div>
          </div>
        </div>
      </motion.div>

      {/* Global Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="md:col-span-8 bg-surface-container-low rounded-3xl p-8 overflow-hidden relative min-h-[300px] flex items-center"
      >
        <div className="relative z-10 max-w-sm space-y-4">
          <h3 className="text-2xl font-semibold text-on-surface">Scale Without Limits</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Whether it's a 10-person workshop or a 10,000-person global summit, UptoHack handles the complexity so you can focus on the content.
          </p>
          <button onClick={() => alert("Enterprise features coming soon!")} className="text-primary font-semibold flex items-center gap-2 group text-sm mt-2">
            Learn about enterprise features
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none">
          <Globe className="w-full h-full" />
        </div>
      </motion.div>
    </div>
  </section>
);

const Stats = () => (
  <section className="max-w-7xl mx-auto px-6 py-24 border-y border-outline-variant/20">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
      {[
        { value: '500K+', label: 'Active Users' },
        { value: '12K', label: 'Communities' },
        { value: '98%', label: 'Retention Rate' },
        { value: '24/7', label: 'Expert Support' },
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">{stat.value}</div>
          <div className="text-xs font-label uppercase tracking-widest text-outline mt-3">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

const BottomCTA = () => (
  <section className="max-w-7xl mx-auto px-6 py-32">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative rounded-[40px] overflow-hidden bg-primary p-12 md:p-24 text-center"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-container rounded-full blur-[100px] opacity-50"></div>
      </div>
      <div className="relative z-10 space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Ready to start your <span className="text-tertiary-fixed">movement?</span>
        </h2>
        <p className="text-on-primary-container/80 text-lg md:text-xl max-w-lg mx-auto">
          Join thousands of creators building the next generation of social connection.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/login" className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block">
            Get Started for Free
          </Link>
          <button onClick={() => alert("Demo booking opened!")} className="bg-primary-container/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary-container/40 transition-all duration-300">
            Book a Demo
          </button>
        </div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface-dim pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-24">
        <div className="space-y-6">
          <span className="text-2xl font-bold tracking-tighter text-on-surface font-headline">UptoHack</span>
          <p className="text-on-surface-variant text-sm leading-relaxed pr-4">
            Redefining the digital community experience through elegant design and seamless utility.
          </p>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening Twitter..."); }} className="text-on-surface-variant hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening Instagram..."); }} className="text-on-surface-variant hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening LinkedIn..."); }} className="text-on-surface-variant hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {[
          { 
            title: 'Product', 
            links: [
              { name: 'Features', path: '/features' },
              { name: 'Pricing', path: '/pricing' },
              { name: 'Integrations', path: '/integrations' },
              { name: 'Live Events', path: '/event' }
            ] 
          },
          { 
            title: 'Resources', 
            links: [
              { name: 'Documentation', path: '/documentation' },
              { name: 'API Reference', path: '/api-reference' },
              { name: 'Community Forum', path: '/community' },
              { name: 'Help Center', path: '/help-center' }
            ] 
          },
          { 
            title: 'Company', 
            links: [
              { name: 'About Us', path: '/about' },
              { name: 'Careers', path: '/careers' },
              { name: 'Blog', path: '/blog' },
              { name: 'Privacy Policy', path: '/privacy-policy' }
            ] 
          },
        ].map((col, i) => (
          <div key={i}>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest font-label text-on-surface">{col.title}</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              {col.links.map((link, j) => (
                <li key={j}>
                  <Link to={link.path} className="hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Massive Animated Footer Text */}
      <div className="w-full flex justify-center items-center overflow-hidden pointer-events-none mt-12 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-[16vw] md:text-[18vw] font-black tracking-tighter leading-none bg-gradient-to-b from-on-surface/20 to-transparent text-transparent bg-clip-text select-none uppercase">
            UPTOHACK
          </h1>
        </motion.div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Stats />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}
