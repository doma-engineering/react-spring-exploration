//  ------------------------------------------------------
//
// This module is testing for render web pages in React
//
//   there compose 3 pages:
//    - simple login
//    - Hiring campaigns
//    - Candidate table
//
//   start from   http://localhost:3000  they will redirect you to
//     http://localhost:3000/Login
//
//   For test you can select one of there company:
//      1. Tea
//      2. WHALE
//
//
//   Then you will in
//         <Hiring campaigns>   <-->  <Candidate tables>  pages.
//   and you always can re-login to other company.
//
//
//   Sad, but now history don't work correct.
//     Path like    http://localhost:3000/CandidateTables/Java#Filters=%5B%7B"tableID"%3A"Java"%2C"tableFilters"%3A%5Bfalse%2Cfalse%2Ctrue%2Cfalse%5D%7D
//     contain   #Filters=   what changes with filters buttons clicks, and it saves to browser history.
//
//  ------------------------------------------------------

import {
    BrowserRouter as Router,
    Link,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import UpsideMenu from './Components/UpsideMenu/UpsideMenu';
import LoginValidator from './Components/Validators/LoginValidator';
import HiringCampaignsPageValidator from './Components/Validators/HiringCampaignsValidator';
import SwitchHiringCampaignsValidator from './Components/Validators/SwitchHiringCampaignsValidator';
import CandidateTableValidator from './Components/Validators/CandidateTableValidator';
import CandidateTableSwitcherValidator from './Components/Validators/SwitchCandidateTableValidator';
import Error404Page from './Pages/Error404Page';
import {
    CANDIDATE_TABLE_SWITCH_MODE_URL_path,
    CANDIDATE_TABLE_URL_path,
    COMMUNITY_URL,
    COMPANIES_URL,
    GET_STARTED_URL,
    HIRING_CAMPAIGNS_MISS_COMPANY_URL_errorPath,
    HIRING_CAMPAIGNS_SWITCH_MODE_URL_path,
    HIRING_CAMPAIGNS_URL_path,
    LOGIN_URL,
    REGISTRATION_URL,
    ROOT_URL,
    TASKS_BY_CATEGORY_URL_path,
    TASKS_URL,
    TERMS_AND_CONDITIONS,
} from './routes';

import './styles.css';
import RootValidator from './Components/Validators/RootValidator';
import CommunityPage from './Pages/CommunityPage';
import CompaniesPage from './Pages/CompaniesPage';
import TasksPage from './Pages/TasksPage';
import GetStartedPage from './Pages/GetStartedPage';
import RegistrationPage from './Pages/RegistrationPage';
import TasksCategoryValidator from './Components/Validators/TasksCategoryValidator';
import TermsAndConditionsPage from './Pages/TermsAndConditionsPage';

import Test1 from './Components/Tests/Test1';
import Test2 from './Components/Tests/Test2';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import Test3 from './Components/Tests/Test3';

const App = () => {
    return (
        <div className="bg-slate-800 max-w-screen min-h-screen">
            <Router basename="ZHR">
                <UpsideMenu />
                <Routes>
                    <Route path={ROOT_URL} element={<RootValidator />} />
                    <Route
                        path={GET_STARTED_URL}
                        element={<GetStartedPage />}
                    />
                    <Route
                        path={REGISTRATION_URL}
                        element={<RegistrationPage />}
                    />
                    <Route
                        path={TERMS_AND_CONDITIONS}
                        element={<TermsAndConditionsPage />}
                    />
                    <Route path={LOGIN_URL} element={<LoginValidator />} />
                    <Route
                        path={HIRING_CAMPAIGNS_URL_path}
                        element={<HiringCampaignsPageValidator />}
                    />
                    <Route
                        path={HIRING_CAMPAIGNS_SWITCH_MODE_URL_path}
                        element={<SwitchHiringCampaignsValidator />}
                    />
                    <Route
                        path={CANDIDATE_TABLE_URL_path}
                        element={<CandidateTableValidator />}
                    />
                    <Route
                        path={CANDIDATE_TABLE_SWITCH_MODE_URL_path}
                        element={<CandidateTableSwitcherValidator />}
                    />
                    <Route
                        path={HIRING_CAMPAIGNS_MISS_COMPANY_URL_errorPath}
                        element={<Navigate to={LOGIN_URL} />}
                    />
                    <Route
                        path={TASKS_BY_CATEGORY_URL_path}
                        element={<TasksCategoryValidator />}
                    />
                    {/* Decorative pages */}
                    <Route path={COMMUNITY_URL} element={<CommunityPage />} />
                    <Route path={COMPANIES_URL} element={<CompaniesPage />} />
                    <Route path={TASKS_URL} element={<TasksPage />} />
                    {/* end of decorative page */}
                    <Route path="*" element={<Error404Page />} />
                </Routes>
            </Router>

            <Router basename="getHired">
                <Routes>
                    <Route path="*" element={<Error404Page />} />
                </Routes>
            </Router>

            {/* Developer help */}
            <Router basename="">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="flex flex-col items-center px-4">
                                <p className="mt-16 text-3xl text-slate-200">
                                    Welcome to <b>Zero HR</b> testing front end.
                                </p>
                                <Link
                                    className="mt-10 text-orange-400 text-3xl text-center bg-slate-700/50 py-2 px-4 rounded-lg"
                                    to={'ZHR'}
                                    reloadDocument
                                >
                                    Go to ZeroHR for HR
                                </Link>
                                <Link
                                    className="mt-5 text-blue-500 text-3xl text-center bg-slate-700/50 py-2 px-4 rounded-lg"
                                    to={'getHired'}
                                    reloadDocument
                                >
                                    Go to ZeroHR for Candidates
                                </Link>
                                <Link
                                    className="mt-5 text-lime-300 text-3xl text-center bg-slate-700/50 py-2 px-4 rounded-lg"
                                    to={'tests'}
                                    reloadDocument
                                >
                                    Tests!
                                </Link>
                            </div>
                        }
                    />
                </Routes>
            </Router>
            <Router basename="tests">
                <Link
                    className="z-50 w-10 h-10 text-orange-500 text-xl border-2 border-orange-400 absolute m-3 rounded-full flex justify-center items-center"
                    to={'/'}
                >
                    <MdOutlineArrowBackIos />
                </Link>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="w-full flex flex-col items-center flex-wrap">
                                <Link
                                    to={'1'}
                                    className="text-2xl text-slate-200 py-3 bg-slate-700 mt-5 rounded w-10/12 lg:w-3/12 text-center"
                                >
                                    Test Spring
                                </Link>
                                <Link
                                    to={'2'}
                                    className="text-2xl text-slate-200 py-3 bg-slate-700 mt-5 rounded w-10/12 lg:w-3/12 text-center"
                                >
                                    Spring with Gestures
                                </Link>
                                <Link
                                    to={'3'}
                                    className="text-2xl text-slate-200 py-3 bg-slate-700 mt-5 rounded w-10/12 lg:w-3/12 text-center"
                                >
                                    Menu with Gestures
                                </Link>
                            </div>
                        }
                    />
                    <Route path="/1" element={<Test1 />} />
                    <Route path="/2" element={<Test2 />} />
                    <Route path="/3" element={<Test3 />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
