import os

base_dir = r'src/app/(main)'

files = [
    (
        'author/layout.tsx',
        '''\'use client\';
import DashboardLayout from \'@/components/layout/DashboardLayout\';
import { 
  LayoutDashboard, BookOpen, TrendingUp, DollarSign, 
  BarChart2, ShoppingCart, MessageSquare, Bell, Settings, PlusCircle
} from \'lucide-react\';
import React from 'react';

const authorNavItems = [
  { label: \'Dashboard\', href: \'/author/dashboard\', icon: <LayoutDashboard size={20} /> },
  { label: \'My Books\', href: \'/author/books\', icon: <BookOpen size={20} /> },
  { label: \'Sales\', href: \'/author/sales\', icon: <TrendingUp size={20} /> },
  { label: \'Royalty\', href: \'/author/royalty\', icon: <DollarSign size={20} /> },
  { label: \'Analytics\', href: \'/author/analytics\', icon: <BarChart2 size={20} /> },
  { label: \'Orders\', href: \'/author/orders\', icon: <ShoppingCart size={20} /> },
  { label: \'Messages\', href: \'/author/messages\', icon: <MessageSquare size={20} /> },
  { label: \'Notifications\', href: \'/author/notifications\', icon: <Bell size={20} /> },
  { label: \'Settings\', href: \'/author/settings\', icon: <Settings size={20} /> },
  { label: \'Upload Book\', href: \'/author/upload-book\', icon: <PlusCircle size={20} /> },
];

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={authorNavItems} userRole=\"Author\">
      {children}
    </DashboardLayout>
  );
}'''
    ),
    (
        'admin/layout.tsx',
        '''\'use client\';
import DashboardLayout from \'@/components/layout/DashboardLayout\';
import { 
  LayoutDashboard, BookOpen, Users, ShoppingCart, DollarSign, 
  FileText, Tag, Star, MessageSquare, Mail, LifeBuoy, Settings, Shield
} from \'lucide-react\';
import React from 'react';

const adminNavItems = [
  { label: \'Dashboard\', href: \'/admin/dashboard\', icon: <LayoutDashboard size={20} /> },
  { label: \'Books\', href: \'/admin/books\', icon: <BookOpen size={20} /> },
  { label: \'Authors\', href: \'/admin/authors\', icon: <Users size={20} /> },
  { label: \'Orders\', href: \'/admin/orders\', icon: <ShoppingCart size={20} /> },
  { label: \'Payments\', href: \'/admin/payments\', icon: <DollarSign size={20} /> },
  { label: \'Users\', href: \'/admin/users\', icon: <Users size={20} /> },
  { label: \'Blogs\', href: \'/admin/blogs\', icon: <FileText size={20} /> },
  { label: \'Coupons\', href: \'/admin/coupons\', icon: <Tag size={20} /> },
  { label: \'Reviews\', href: \'/admin/reviews\', icon: <Star size={20} /> },
  { label: \'Messages\', href: \'/admin/messages\', icon: <MessageSquare size={20} /> },
  { label: \'Newsletter\', href: \'/admin/newsletter\', icon: <Mail size={20} /> },
  { label: \'Support\', href: \'/admin/support\', icon: <LifeBuoy size={20} /> },
  { label: \'Settings\', href: \'/admin/settings\', icon: <Settings size={20} /> },
  { label: \'Roles\', href: \'/admin/roles\', icon: <Shield size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={adminNavItems} userRole=\"Admin\">
      {children}
    </DashboardLayout>
  );
}'''
    )
]

def create_generic_page(role, name):
    dir_path = f"{role}/{name}"
    comp_name = ''.join([s.capitalize() for s in name.split('-')]) + 'Page'
    title = name.replace('-', ' ').title()
    content = f'''\'use client\';
import React from \'react\';
import {{ motion }} from \'framer-motion\';

export default function {comp_name}() {{
  return (
    <motion.div
      initial={{{{ opacity: 0, y: 20 }}}}
      animate={{{{ opacity: 1, y: 0 }}}}
      className=\"space-y-6\"
    >
      <div className=\"flex justify-between items-center\">
        <h1 className=\"text-3xl font-bold font-playfair text-[#1A1A2E]\">{title}</h1>
      </div>
      <div className=\"bg-white p-6 rounded-2xl shadow-sm border border-gray-100\">
        <p className=\"text-gray-600\">{title} content coming soon...</p>
      </div>
    </motion.div>
  );
}}
'''
    return (f"{dir_path}/page.tsx", content)

author_pages = ['dashboard', 'books', 'sales', 'royalty', 'analytics', 'orders', 'messages', 'notifications', 'settings', 'upload-book']
admin_pages = ['dashboard', 'books', 'authors', 'orders', 'payments', 'users', 'blogs', 'coupons', 'reviews', 'messages', 'newsletter', 'support', 'settings', 'roles']

for p in author_pages:
    files.append(create_generic_page('author', p))

for p in admin_pages:
    files.append(create_generic_page('admin', p))

for file_path, content in files:
    full_path = os.path.join(base_dir, file_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Created {{full_path}}')
