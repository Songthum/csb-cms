import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import SideBar from '../component/sidebar';
import ExamManage from '../page/exam-management/index';
import RoomManagement from '../page/room-management/index';
import '../theme/css/sidebar.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SideBar 
        page={ <App />}
        pageName={"หน้าหลัก"}
        pageSub={""}
        path={"/"}
      />
    ),
  },
  {
    path: "/exam-management",
    element: (
      <SideBar 
        page={ <ExamManage />}
        pageName={"จัดการข้อสอบ"}
        pageSub={""}
        path={"/exam-management"}
      />
    ),
  },
  {
    path: "/room-management",
    element: (
      <SideBar 
        page={ <RoomManagement />}
        pageName={"จัดการห้องสอบ"}
        pageSub={""}
        path={"/room-management"}
      />
    ),
  },
]);

export default router;
