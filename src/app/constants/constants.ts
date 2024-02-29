declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
  }

export const N_ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Basketball', icon: 'dashboard', class: '' },
    { path: '/add-service', title: 'Boxing', icon: 'note_add', class: '' },
    { path: '/add-s', title: 'Esports', icon: 'note_add', class: '' },
    { path: '/football', title: 'Football', icon: 'list', class: '' },
    { path: '/tennis', title: 'Tennis', icon: 'list', class: '' },
    { path: '/add-customer', title: 'Cricket', icon: 'note_add', class: '' },
    { path: '/customer-list', title: 'Golf', icon: 'list', class: '' },
    { path: '/add-fuller', title: 'Greyhound Racing', icon: 'note_add', class: '' },
    { path: '/fuller-list', title: 'Horse Racing', icon: 'list', class: '' },
    { path: '/invoice-list', title: 'Tennis', icon: 'list', class: '' },
];

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: '/add-service', title: 'Add Service', icon: 'note_add', class: '' },
    { path: '/football', title: 'Football', icon: 'list', class: '' },
    { path: '/tennis', title: 'Tennis', icon: 'list', class: '' },
    { path: '/add-customer', title: 'Add Customer', icon: 'note_add', class: '' },
    { path: '/customer-list', title: 'Customer List', icon: 'list', class: '' },
    { path: '/add-fuller', title: 'Add Fuller', icon: 'note_add', class: '' },
    { path: '/fuller-list', title: 'Fuller List', icon: 'list', class: '' },
    { path: '/invoice-list', title: 'Invoice List', icon: 'list', class: '' },
  ];