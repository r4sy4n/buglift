import {MdDashboard} from 'react-icons/md';
import {AiFillProject} from 'react-icons/ai';
import {HiTicket} from 'react-icons/hi';
import {RiAdminFill} from 'react-icons/ri';
import {CgProfile} from 'react-icons/cg';
const role = localStorage.getItem('role');

const links = [
    {
        id: 1,
        text: 'Dashboard',
        path: '/',
        icon: <MdDashboard/>,
    },
    {
        id: 2,
        text: 'Projects',
        path: 'projects',
        icon: <AiFillProject/>,
    },
    {
        id: 3,
        text: 'Tickets',
        path: 'tickets',
        icon: <HiTicket/>,
    },
    ...(role === 'admin'
    ? [
        {
          id: 4,
          text: 'Admin',
          path: 'admin',
          icon: <RiAdminFill />,
        },
      ]
    : []),
    ...(role === 'user'
        ? [
            {
            id: 5,
            text: 'User Profile',
            path: '/userprofile',
            icon: <CgProfile />,
            },
        ]
        : []),
];

export default links;
