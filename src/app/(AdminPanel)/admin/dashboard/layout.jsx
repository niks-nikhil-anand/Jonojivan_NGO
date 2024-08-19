import 'tailwindcss/tailwind.css';
import '@/app/globals.css';
import NavbarAdmin from '@/components/adminPanel/NavbarAdmin';
import SidebarAdmin from '@/components/adminPanel/SidebarAdmin';



const Layout = ({ children }) => {
  return (
        <div>
          <div>
          <NavbarAdmin />
          </div>
          <div className="flex ">
            <SidebarAdmin className="w-1/4" />
              {children}
          </div>
        </div>
  );
}

export default Layout;
