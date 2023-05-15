import {MdDashboard} from 'react-icons/md';
import {AiFillProject} from 'react-icons/ai';
import {HiTicket} from 'react-icons/hi';
import {RiAdminFill} from 'react-icons/ri';
// import {CgProfile} from 'react-icons/cg';

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
    {
        id: 4,
        text: 'Admin',
        path: 'admin',
        icon: <RiAdminFill/>,
    },
]

export default links;
