
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobsLanding from './pages/JobsLanding';
import PostJob from './pages/PostJob';
import HigherStudies from './pages/HigherStudies';
import DaeCourses from './pages/DaeCourses';
import AiMentor from './pages/AiMentor';
import AiDreamer from './pages/AiDreamer';
import AbroadPath from './pages/AbroadPath';
import Blog from './pages/Blog';
import About from './pages/About';
import MyRoadmaps from './pages/MyRoadmaps';
import Dashboard from './pages/Dashboard';
import CoursePlayer from './pages/CoursePlayer';
import AiTools from './pages/AiTools';
import CvAnalyzer from './pages/CvAnalyzer';
import VisionBoard from './pages/VisionBoard';
import GenAiAcademy from './pages/GenAiAcademy';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/academy" element={<GenAiAcademy />} />
          <Route path="/jobs" element={<JobsLanding />} />
          <Route path="/jobs/pakistan" element={<Jobs />} />
          <Route path="/jobs/abroad" element={<AbroadPath />} />
          <Route path="/jobs/post" element={<PostJob />} />
          <Route path="/higher-studies" element={<HigherStudies />} />
          <Route path="/dae-pakistan" element={<DaeCourses />} />
          <Route path="/ai-tools" element={<AiTools />} />
          <Route path="/cv-analyzer" element={<CvAnalyzer />} />
          <Route path="/entrepreneur" element={<HigherStudies title="Entrepreneurship" />} />
          <Route path="/dreamer" element={<AiDreamer />} />
          <Route path="/vision-board" element={<VisionBoard />} />
          <Route path="/my-roadmaps" element={<MyRoadmaps />} />
          <Route path="/course/:courseId" element={<CoursePlayer />} />
          <Route path="/mentor" element={<AiMentor />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
