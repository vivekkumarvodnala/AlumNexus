alumnexus-frontend/
│── public/                # Static assets
│
│── src/
│   │── assets/            # Images, icons, logos
│   │── components/        # Reusable UI components
│   │   │── Navbar.jsx
│   │   │── Footer.jsx
│   │   │── PostCard.jsx
│   │   │── ProfileCard.jsx
│   │   │── FilterSidebar.jsx
│   │   │── Modal.jsx
│   │   │── Forms/
│   │       │── LoginForm.jsx
│   │       │── RegistrationForm.jsx
│   │
│   │── pages/             # Main pages (role-based)
│   │   │── Auth/
│   │   │   │── Login.jsx
│   │   │   │── Register.jsx
│   │   │
│   │   │── Student/
│   │   │   │── Dashboard.jsx
│   │   │   │── AlumniDirectory.jsx
│   │   │   │── JobReferrals.jsx
│   │   │   │── InterviewExperiences.jsx
│   │   │   │── SuccessStories.jsx
│   │   │   │── ResourceBank.jsx
│   │   │   │── CompanyReviews.jsx
│   │   │   │── ChatAlumni.jsx
│   │   │   │── MockInterviewScheduler.jsx
│   │   │   │── TextToSpeech.jsx
│   │   │
│   │   │── Alumni/
│   │   │   │── Dashboard.jsx
│   │   │   │── ManageProfile.jsx
│   │   │   │── PostReferral.jsx
│   │   │   │── PostExperience.jsx
│   │   │   │── PostStory.jsx
│   │   │   │── PostResource.jsx
│   │   │   │── PostReview.jsx
│   │   │
│   │   │── Admin/
│   │   │   │── Dashboard.jsx
│   │   │   │── UserManagement.jsx
│   │   │   │── ContentModeration.jsx
│   │   │   │── AnalyticsDashboard.jsx
│   │   │   │── RoleConversion.jsx
│   │
│   │── hooks/             # Custom React hooks (auth, fetch, etc.)
│   │── context/           # Global state (AuthContext, ThemeContext)
│   │── utils/             # Helpers (formatDate, constants)
│   │── routes/            # Route handling
│   │   │── PrivateRoute.jsx
│   │   │── RoleBasedRoute.jsx
│   │
│   │── App.jsx            # Root component
│   │── main.jsx           # Entry point
│
│── package.json
│── tailwind.config.js
│── vite.config.js
