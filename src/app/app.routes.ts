import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path: '',
  loadComponent: () =>
    import('./features/splash/splash.page')
      .then(m => m.SplashPage)
},

{
  path: 'login',
  loadComponent: () =>
    import('./features/auth/login/login.page')
      .then(m => m.LoginPage)
},

{
  path: 'register',
  loadComponent: () =>
    import('./features/auth/register/register.page')
      .then(m => m.RegisterPage)
},
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

    // ✅ ADD CHAT HERE
    
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
    path: 'track-order',
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
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }

  ]
},

{
  path: '**',
  redirectTo: ''
},
  
  
  

];