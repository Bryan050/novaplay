import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import VideoPlayer from "../pages/VideoPlayer";

const AppRoutes = () => {
    return <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/video/*" element={<VideoPlayer/>}/>
    </Routes>
}

export default AppRoutes;