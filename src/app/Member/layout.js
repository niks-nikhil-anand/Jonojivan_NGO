import 'tailwindcss/tailwind.css';
import '@/app/globals.css';
import SidebarVolunteer from '@/components/volunteer/SidebarVolunteer';
import NavbarVolunteer from '@/components/volunteer/NavbarVolunteer';

const Layout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <SidebarVolunteer className="w-1/4 h-screen bg-gray-800" />
      <div className="flex-1 overflow-hidden ">
        <NavbarVolunteer className="w-full " />
        {children}
      </div>
    </div>
  );
};

export default Layout;
