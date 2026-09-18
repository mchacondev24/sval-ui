export interface ExampleMetadata {
  id: string;
  name: string;
  category: 
    | 'Starters'
    | 'Marketing'
    | 'Applications'
    | 'Dashboards'
    | 'Authentication'
    | 'E-commerce'
    | 'Business'
    | 'Data'
    | 'Navigation'
    | 'Forms';
  description: string;
  tags: string[];
  componentsUsed: string[];
  featured?: boolean;
  image: string;
  accentColor?: 'emerald' | 'sky' | 'indigo' | 'amber' | 'purple' | 'rose';
  badgeText?: string;
}

export const EXAMPLES_CATALOG: ExampleMetadata[] = [
  // Dashboards
  {
    id: 'dashboard-basic',
    name: 'Dashboard Basic',
    category: 'Dashboards',
    description: 'Executive KPI metrics, revenue stream chart, order tracking, and live telemetry log.',
    tags: ['Dashboard', 'Charts', 'KPI', 'Responsive', 'Tables'],
    componentsUsed: ['Card', 'Badge', 'Button', 'Progress', 'Table', 'Avatar'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    accentColor: 'emerald',
    badgeText: 'Live KPI Ledger',
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics & Traffic Dashboard',
    category: 'Dashboards',
    description: 'Conversion funnel analytics, user geography distribution, session depth, and cohort heatmaps.',
    tags: ['Analytics', 'Charts', 'Metrics', 'Dark Mode'],
    componentsUsed: ['Card', 'Tabs', 'DataTable', 'Progress', 'Badge', 'Select'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    accentColor: 'sky',
    badgeText: 'Funnel Heatmaps',
  },

  // Applications
  {
    id: 'app-pos',
    name: 'Point of Sale (POS)',
    category: 'Applications',
    description: 'Touch-optimized checkout register for retail and cafes with live ticket calculation, product categories, and receipt printer.',
    tags: ['POS', 'Retail', 'Touch-Optimized', 'Calculator', 'Enterprise'],
    componentsUsed: ['Button', 'Card', 'Badge', 'Dialog', 'Input', 'Tabs'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    accentColor: 'amber',
    badgeText: 'Touch POS Terminal',
  },
  {
    id: 'app-crm',
    name: 'CRM & Pipeline Hub',
    category: 'Applications',
    description: 'Deal kanban columns, customer accounts, task assignments, and commercial opportunity forecasting.',
    tags: ['CRM', 'Pipeline', 'Kanban', 'Customer', 'Deals'],
    componentsUsed: ['Card', 'Badge', 'Avatar', 'Button', 'Tabs', 'Dropdown'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    accentColor: 'indigo',
    badgeText: 'Pipeline Kanban',
  },
  {
    id: 'app-admin',
    name: 'Admin Panel & Security Center',
    category: 'Applications',
    description: 'System health monitoring, role-based access control matrix, session tokens, and security audit logs.',
    tags: ['Admin', 'Security', 'RBAC', 'Audit Log', 'Permissions'],
    componentsUsed: ['DataTable', 'Badge', 'Switch', 'Button', 'Card', 'Dialog'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    accentColor: 'rose',
    badgeText: 'RBAC Security Matrix',
  },

  // Marketing
  {
    id: 'marketing-landing',
    name: 'Marketing Landing Page',
    category: 'Marketing',
    description: 'High-converting Scandinavian product landing hero, feature matrix, customer proof, and lead capture.',
    tags: ['Landing', 'Hero', 'Conversion', 'SaaS'],
    componentsUsed: ['Button', 'Badge', 'Card', 'Input', 'Accordion'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
    accentColor: 'sky',
    badgeText: 'Conversion Hero',
  },
  {
    id: 'marketing-pricing',
    name: 'Nordic Tiered Pricing',
    category: 'Marketing',
    description: 'Monthly and annual billing toggle, highlighted enterprise tier, feature comparison checklist, and FAQ.',
    tags: ['Pricing', 'Billing', 'Comparison', 'FAQ'],
    componentsUsed: ['Card', 'Button', 'Badge', 'Switch', 'Accordion'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    accentColor: 'purple',
    badgeText: 'Tier Comparison',
  },

  // E-Commerce
  {
    id: 'ecommerce-catalog',
    name: 'Nordic E-Commerce Catalog',
    category: 'E-commerce',
    description: 'Furniture and architecture hardware shop with facet filters, responsive card grid, and drawer checkout cart.',
    tags: ['Store', 'Shopping Cart', 'Filter', 'Drawer', 'Retail'],
    componentsUsed: ['Card', 'Badge', 'Button', 'Drawer', 'Slider', 'Select'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
    accentColor: 'emerald',
    badgeText: 'Cart Drawer',
  },
  {
    id: 'ecommerce-checkout',
    name: 'One-Page Express Checkout',
    category: 'E-commerce',
    description: 'Streamlined checkout with address verification, payment option tabs, discount codes, and order summary.',
    tags: ['Checkout', 'Payment', 'Order', 'Form'],
    componentsUsed: ['Input', 'Radio', 'Button', 'Card', 'Checkbox', 'Select'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
    accentColor: 'amber',
    badgeText: 'Express Pay',
  },

  // Forms
  {
    id: 'forms-wizard',
    name: 'Multi-Step Enterprise Wizard',
    category: 'Forms',
    description: 'Guided multi-step workflow with Stepper validation, KYC document upload, and review confirmation.',
    tags: ['Wizard', 'Stepper', 'Validation', 'File Upload'],
    componentsUsed: ['Stepper', 'Input', 'FileUpload', 'Button', 'Select', 'Checkbox'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    accentColor: 'indigo',
    badgeText: 'KYC Stepper',
  },
  {
    id: 'forms-registration',
    name: 'Account Onboarding & Security Form',
    category: 'Forms',
    description: 'Clean Scandinavian registration layout with password strength indicator, role select, and terms agreement.',
    tags: ['Registration', 'Onboarding', 'Validation'],
    componentsUsed: ['Input', 'Select', 'Checkbox', 'Button', 'Alert'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    accentColor: 'sky',
    badgeText: 'Auth Onboard',
  },

  // Authentication
  {
    id: 'auth-suite',
    name: 'Authentication Suite (Sign In, Reset, 2FA)',
    category: 'Authentication',
    description: 'Unified authentication flows including modern minimalist Sign In, Reset Password, 2FA verification, and Lock Screen.',
    tags: ['Auth', 'Sign In', 'Security', '2FA', 'Lock Screen'],
    componentsUsed: ['Card', 'Input', 'Button', 'Alert', 'Checkbox'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    accentColor: 'purple',
    badgeText: '2FA & Recovery',
  },

  // Data
  {
    id: 'data-table-advanced',
    name: 'Enterprise Data Table & Ledger',
    category: 'Data',
    description: 'Multi-column sorting, row selection, live search filtering, status tags, CSV export, and pagination controls.',
    tags: ['Data Table', 'Sorting', 'Export', 'Pagination'],
    componentsUsed: ['DataTable', 'Pagination', 'Input', 'Button', 'Badge', 'Dropdown'],
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
    accentColor: 'emerald',
    badgeText: 'Exportable Ledger',
  },

  // Starters
  {
    id: 'starters-app-shell',
    name: 'Application Shell Starter',
    category: 'Starters',
    description: 'Production-ready responsive layout skeleton with collapsible sidebar, top navigation bar, and breadcrumb.',
    tags: ['Starter', 'Layout', 'Shell', 'Sidebar', 'Minimal'],
    componentsUsed: ['Breadcrumb', 'Button', 'Avatar', 'Card', 'Dropdown'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    accentColor: 'indigo',
    badgeText: 'Shell Layout',
  },
  {
    id: 'starters-minimal',
    name: 'Blank Clean Starter Canvas',
    category: 'Starters',
    description: 'Zero-clutter scaffold with theme tokens and basic button trigger for bootstrapping custom web apps.',
    tags: ['Starter', 'Blank', 'Clean'],
    componentsUsed: ['Button', 'Card', 'Badge'],
    image: 'https://images.unsplash.com/photo-1507842229451-7707e7811bf5?w=800&auto=format&fit=crop&q=80',
    accentColor: 'sky',
    badgeText: 'Zero-Clutter',
  },
];
