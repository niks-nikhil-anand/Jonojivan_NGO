import 'tailwindcss/tailwind.css';
import '@/app/globals.css';
import SidebarVendor from '@/components/vendorPanel/SidebarVendor';
import NavbarVendor from '@/components/vendorPanel/NavbarVendor';


const Layout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen">
      <SidebarVendor className="w-1/4 h-screen bg-gray-800" />
      <div className="flex flex-col w-full">
        <NavbarVendor className="w-full" />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
