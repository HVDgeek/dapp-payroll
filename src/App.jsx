import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import CreateOrg from "./components/CreateOrg";
import Organizations from "./pages/Organizations";
import Payrolls from "./pages/Payrolls";
import Organization from "./pages/Organization";
import Payroll from "./pages/Payroll";
import { isConnectedWallet, loadData } from "./services/blockchain";

const App = () => {
  useEffect(() => {
    const loadBloackchain = async () => {
      await isConnectedWallet();
      await loadData();
      console.log("Blockchain loaded!");
    };

    loadBloackchain();
  }, []);
  return (
    <div className="flex bg-[#f1f1f9] min-h-screen relative">
      <Sidebar />
      <main className="flex flex-col space-y-3 w-full overflow-hidden">
        <Header />
        <div className="p-5 sm:px-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organization/:id" element={<Organization />} />
            <Route path="/payrolls" element={<Payrolls />} />
            <Route path="/payroll/:id" element={<Payroll />} />
          </Routes>
        </div>
        <div className="lg:hidden h-20"></div>
        <Footer />
      </main>
      <CreateOrg />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
