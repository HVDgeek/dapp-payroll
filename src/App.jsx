import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Organizations from "./pages/Organizations";
import Payrolls from "./pages/Payrolls";

const App = () => {
  return (
    <div className="flex bg-[#f1f1f9] min-h-screen relative">
      <Sidebar />
      <main className="flex flex-col space-y-3 w-full overflow-hidden">
        <Header />
        <div className="p-5 sm:px-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/payrolls" element={<Payrolls />} />
          </Routes>
        </div>
        <div className="lg:hidden h-20"></div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
