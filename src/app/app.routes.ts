import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // Splash
  {
    path: '',
    loadComponent: () =>
      import('./features/splash/splash.page')
        .then(m => m.SplashPage)
  },

  // Role Selection
  {
    path: 'role-selection',
    loadComponent: () =>
      import('./pages/role-selection/role-selection.page')
        .then(m => m.RoleSelectionPage)
  },

  // Authentication
  {
    path: 'customer-login',
    loadComponent: () =>
      import('./features/auth/customer-login/customer-login.page')
        .then(m => m.CustomerLoginPage)
  },
  {
    path: 'customer-register',
    loadComponent: () =>
      import('./features/auth/customer-register/customer-register.page')
        .then(m => m.CustomerRegisterPage)
  },
  {
    path: 'admin-login',
    loadComponent: () =>
      import('./features/auth/admin-login/admin-login.page')
        .then(m => m.AdminLoginPage)
  },
  {
    path: 'technician-login',
    loadComponent: () =>
      import('./features/auth/technician-login/technician-login.page')
        .then(m => m.TechnicianLoginPage)
  },

  // Admin
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./features/admin/admin-dashboard/admin-dashboard.page')
        .then(m => m.AdminDashboardPage)
  },
  {
  path: 'admin-orders',
  canActivate: [authGuard],
  data: { role: 'Admin' },
  loadComponent: () =>
    import('./features/admin/admin-orders/admin-orders.page')
      .then(m => m.AdminOrdersPage)
},


  // Technician
  {
  path: 'technician-dashboard',
  canActivate: [authGuard],
  data: { role: 'Technician' },
  loadComponent: () =>
    import('./features/technician/technician-dashboard/technician-dashboard.page')
      .then(m => m.TechnicianDashboardPage)
},
  
  {
  path: 'assigned-jobs',
  canActivate: [authGuard],
  data: { role: 'Technician' },
  loadComponent: () =>
    import('./features/technician/assigned-jobs/assigned-jobs.page')
      .then(m => m.AssignedJobsPage)
},

  // Booking
  {
    path: 'booking-form',
    loadComponent: () =>
      import('./features/booking-form/booking-form.component')
        .then(m => m.BookingFormComponent)
  },
  {
    path: 'booking-success',
    loadComponent: () =>
      import('./booking-success/booking-success.page')
        .then(m => m.BookingSuccessPage)
  },

  // Customer Tabs
  {
    path: 'tabs',
    loadComponent: () =>
      import('./features/tabs/tabs.page')
        .then(m => m.TabsPage),

    children: [

      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.page')
            .then(m => m.HomePage)
      },

      {
        path: 'plumbing',
        loadComponent: () =>
          import('./features/plumbing/plumbing.page')
            .then(m => m.PlumbingPage)
      },

      {
        path: 'electrical',
        loadComponent: () =>
          import('./features/electrical/electrical.page')
            .then(m => m.ElectricalPage)
      },

      {
        path: 'ac',
        loadComponent: () =>
          import('./features/ac/ac.page')
            .then(m => m.AcPage)
      },

      {
        path: 'account',
        loadComponent: () =>
          import('./features/account/account.page')
            .then(m => m.AccountPage)
      },

      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./features/account/edit-profile/edit-profile.page')
            .then(m => m.EditProfilePage)
      },

      {
        path: 'chat',
        loadComponent: () =>
          import('./pages/chat/chat.page')
            .then(m => m.ChatPage)
      },

      {
        path: 'booking',
        loadComponent: () =>
          import('./features/booking/booking.page')
            .then(m => m.BookingHistoryPage)
      },

      {
  path: 'track-order/:id',
  loadComponent: () =>
    import('./features/track-order/track-order.page')
      .then(m => m.TrackOrderPage)
},

      {
        path: 'saved-address',
        loadComponent: () =>
          import('./features/saved-address/saved-address.page')
            .then(m => m.SavedAddressPage)
      },

      {
        path: 'review',
        loadComponent: () =>
          import('./features/review/review.component')
            .then(m => m.ReviewComponent)
      },

      // Default Tab
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  // Wildcard Route (Always Last)
  {
    path: '**',
    redirectTo: ''
  }

];