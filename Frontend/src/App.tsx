// import AdminPage from './pages/AdminPage/AdminPage.tsx';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import MemberRoute from './utils/MemberRoute.tsx';
import MemberLayout from './Layouts/MemberLayout.tsx';
import AdminRoute from './utils/AdminRoute.tsx';
import AdminLayout from './Layouts/AdminLayout.tsx';
import CourseTable from './components/Admin/Courses/CourseTable/CourseTable.tsx';
import MembersTable from './components/Admin/MembersTable/MembersTable.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { DateProvider } from './context/DateContext.tsx';
import CourseTemplateDisplay from './components/Admin/Courses/CourseTemplates/CourseTemplateDisplay.tsx';
import Dashboard from './components/Admin/Dashboard/Dashboard.tsx';
import UserProfile from './components/Members/Profile/UserProfile.tsx';
import Orders from './components/Members/Orders/Orders.tsx';
import AdminProducts from './components/Admin/Products/AdminProducts.tsx';
import AdminProfile from './components/Admin/Profile/AdminProfile.tsx';
import AdminOrders from './components/Admin/AdminOrders/AdminOrders.tsx';
import MembersCourseTable from './components/Members/Courses/MembersCourseTable.tsx';
import BookedCourses from './components/Members/Courses/BookedCourses.tsx';

import CoursesPage from './pages/CoursesPage/CoursesPage.tsx';
import SingleCoursePage from './pages/CoursesPage/SingleCoursePage.tsx';

function App() {
  return (
    <UserProvider>
      <DateProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
          {/* Private Routes for Members */}
          <Route
            path="/member"
            element={
              <MemberRoute>
                <MemberLayout />
              </MemberRoute>
            }
          >
            <Route path="profile" element={<UserProfile />} />
            <Route path="courses">
              <Route path="week" element={<MembersCourseTable />} />
              <Route path="booked" element={<BookedCourses />} />
            </Route>
            <Route path="orders" element={<Orders />} />
          </Route>
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses">
              <Route path="week" element={<CourseTable />} />
              <Route path="templates" element={<CourseTemplateDisplay />} />
            </Route>
            <Route path="members" element={<MembersTable />} />
            <Route path="shop" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </DateProvider>
    </UserProvider>
  );
}

export default App;
