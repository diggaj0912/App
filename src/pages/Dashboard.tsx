import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  MoreVertical,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
  const location = useLocation();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Users, label: 'Communities', path: '/communities' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-16 flex items-center px-6 border-b border-outline-variant/20">
          <span className="text-xl font-bold tracking-tighter text-on-surface font-headline">
            Curator
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8lsF7EjahYQvzMul7Z0r2GeyQlpvZCf_SR0R8foON7kwsJ8aoAFX45_94TM2TJrADixtJ18B419bxaDIu9C_4mMh8ugDCgXjqXpZQCDsRDZ3JnCBahEvuEzaGTZ7ckPYZfePRYbZ1IWadAzmtycVkuKblaW6F9YdMYAKzAeOjJz_OPYIqeuzcNKrc3a_UkSOu4BH9YJPcW1DH_F3NI6NHW00gUKR8zobwV4_ujqHOytWIa67JG2YTIK6fxWc4L19xZ63OiJCh131o"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-on-surface truncate">Alex Morgan</span>
              <span className="text-xs text-on-surface-variant truncate">alex@curator.app</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
    <div className="flex items-center gap-4">
      <button 
        onClick={onMenuClick}
        className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg md:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="hidden md:flex items-center bg-surface-container-lowest border border-outline-variant/20 px-3 py-1.5 rounded-full w-96 focus-within:border-primary/50 transition-colors">
        <Search className="text-on-surface-variant w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent border-none focus:outline-none text-sm text-on-surface w-full placeholder:text-outline"
        />
      </div>
    </div>
    <div className="flex items-center gap-2 md:gap-4">
      <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
      </button>
      <button className="bg-primary text-on-primary px-3 md:px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm shadow-primary/20">
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">New Event</span>
      </button>
    </div>
  </header>
);

const StatCard = ({ title, value, trend, isPositive, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center">
        <Icon className="w-5 h-5 text-on-surface-variant" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
        isPositive ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
      }`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <div className="space-y-1">
      <h4 className="text-on-surface-variant text-sm font-medium">{title}</h4>
      <div className="text-3xl font-bold text-on-surface tracking-tight">{value}</div>
    </div>
  </motion.div>
);

const UpcomingEvents = () => {
  const events = [
    { id: 1, title: 'Design Leadership Summit', date: 'Oct 24, 2024', time: '09:00 AM', attendees: 124, status: 'Published', revenue: '$12,400' },
    { id: 2, title: 'Web3 Builders Meetup', date: 'Oct 28, 2024', time: '06:30 PM', attendees: 85, status: 'Draft', revenue: '-' },
    { id: 3, title: 'Product Strategy Workshop', date: 'Nov 02, 2024', time: '10:00 AM', attendees: 210, status: 'Published', revenue: '$8,950' },
    { id: 4, title: 'Founder Networking Dinner', date: 'Nov 15, 2024', time: '07:00 PM', attendees: 45, status: 'Sold Out', revenue: '$4,500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-on-surface">Upcoming Events</h3>
        <button className="text-primary text-sm font-medium hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
              <th className="px-6 py-4 text-xs font-label uppercase tracking-wider text-outline">Event Name</th>
              <th className="px-6 py-4 text-xs font-label uppercase tracking-wider text-outline">Date & Time</th>
              <th className="px-6 py-4 text-xs font-label uppercase tracking-wider text-outline">Attendees</th>
              <th className="px-6 py-4 text-xs font-label uppercase tracking-wider text-outline">Revenue</th>
              <th className="px-6 py-4 text-xs font-label uppercase tracking-wider text-outline">Status</th>
              <th className="px-6 py-4 text-xs font-label uppercase tracking-wider text-outline text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-on-surface text-sm">{event.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-on-surface">{event.date}</div>
                  <div className="text-xs text-on-surface-variant">{event.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-sm text-on-surface">{event.attendees}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-on-surface">{event.revenue}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'Published' ? 'bg-green-500/10 text-green-600' :
                    event.status === 'Sold Out' ? 'bg-primary/10 text-primary' :
                    'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Overview</h1>
                <p className="text-on-surface-variant mt-1">Here's what's happening with your communities today.</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-1 w-full sm:w-auto overflow-x-auto">
                <button className="px-3 py-1.5 text-sm font-medium bg-surface-container-low text-on-surface rounded-lg shadow-sm whitespace-nowrap">30 Days</button>
                <button className="px-3 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors whitespace-nowrap">7 Days</button>
                <button className="px-3 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors whitespace-nowrap">24 Hours</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatCard title="Total Revenue" value="$45,231" trend="12.5%" isPositive={true} icon={TrendingUp} delay={0} />
              <StatCard title="Active Members" value="12,450" trend="8.2%" isPositive={true} icon={Users} delay={0.1} />
              <StatCard title="Tickets Sold" value="1,234" trend="3.1%" isPositive={false} icon={Calendar} delay={0.2} />
              <StatCard title="Engagement Rate" value="64.2%" trend="5.4%" isPositive={true} icon={BarChart3} delay={0.3} />
            </div>

            <UpcomingEvents />
          </div>
        </main>
      </div>
    </div>
  );
}
