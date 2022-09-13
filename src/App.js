import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const  Layout = () => {
  return(
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  )
}

function App() { //여러 컴포넌트 생성 및 라우트 정의하기!
  return (
    <div className='app'>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route path="search" element={<SearchPage />} />

          </Route>
      </Routes>
    </div>
  );
}

export default App;
