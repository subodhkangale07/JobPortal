import './App.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import PageNotFound from './components/PageNotFound'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/protectedRoute'



const appRoute = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'*',
    element:<PageNotFound/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

  // below all paths for admin
  {
    path:'/admin/companies',
    element:<ProtectedRoute> <Companies/> </ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  // below routes are for Admin Jobs
  {
    path:'/admin/jobs/',
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }
   
])

function App() {

  return (
    <div>
    <RouterProvider router={appRoute} />
  </div>
  )
}

export default App