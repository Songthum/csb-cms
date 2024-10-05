import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import SideBar from '../component/sidebar';
import ExamManage from '../page/exam-management/index';
import RoomManagement from '../page/room-management/index';
import MemberSpacialProject from '../page/member-spacial-project/index';
import AddMemberSpacialProject from '../page/add-member-spacial-project/index';
import Sp2 from '../page/member-spacial-project/sp-2/index';
import Sp1 from '../page/member-spacial-project/sp-1/index';
import StudentNoLecture from '../page/student-no-lecture/index';
import SumaryRoom from '../page/sumary-room/index';

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
        pageName={"จัดการเวลาสอบ"}
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
        pageName={"สร้างห้องสอบ"}
        pageSub={""}
        path={"/room-management"}
      />
    ),
  },
  {
    path: "/member-spacial-project/sp-1",
    element: (
      <SideBar 
        page={ < Sp1/>}
        pageName={"รายชื่อนักศึกษา"}
        pageSub={"sp-1"}
        path={"/member-spacial-project/sp-1"}
      />
    ),
  },
  {
    path: "/member-spacial-project/sp-2",
    element: (
      <SideBar 
        page={ < Sp2/>}
        pageName={"รายชื่อนักศึกษา"}
        pageSub={"sp-2"}
        path={"/member-spacial-project/sp-2"}
      />
    ),
  },
  {
    path: "/sumary-room",
    element: (
      <SideBar 
        page={ <SumaryRoom />}
        pageName={"สรุปห้องสอบ"}
        pageSub={""}
        path={"/sumary-room"}
      />
    ),
  },
  {
    path: "add-member-spacial-project",
    element: (
      <SideBar 
        page={ <AddMemberSpacialProject />}
        pageName={"เพิ่มรายชื่อนักศึกษา"}
        pageSub={""}
        path={"/add-member-spacial-project"}
      />
    ),
  },
  {
    path: "/student-no-lecture",
    element: (
      <SideBar 
        page={ <StudentNoLecture />}
        pageName={"รายชื่อนักศึกษา"}
        pageSub={"ไม่มีวิชา"}
        path={"/student-no-lecture"}
      />
    ),
  }
]);

export default router;
