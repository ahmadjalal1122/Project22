import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { Routes  } from 'react-router-dom';
// import Post from "./Post";
// import Header from "./Header";
// import Layout from "./Layout";
// import IndexPage from "./pages/IndexPage";
// import LoginPage from "./pages/LoginPage";
// import {UserContextProvider} from "./UserContext";
// import CreatePost from "./pages/CreatePost";
// import PostPage from "./pages/PostPage";
// import EditPost from "./pages/EditPost"; 


 
// import Home from './pages/Home';
import Header from './Header';
import Post from './Post';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserContextProvider from './UserContext';

import React from 'react';
import ReactDOM from 'react-dom';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';


function App() {
  return (
    // <BrowserRouter>
    // {/* <UserContextProvider> */}
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       {/* <Route index element={<IndexPage />} /> */}
    //       {/* <Route path="/login" element={<LoginPage />} /> */}
    //       <Route path="/register" element={<RegisterPage />} />
    //       {/* <Route path="/create" element={<CreatePost />} /> */}
    //       {/* <Route path="/post/:id" element={<PostPage />} /> */}
    //       {/* <Route path="/edit/:id" element={<EditPost />} /> */}
    //     </Route>
    //   </Routes>
    // {/* </UserContextProvider> */}
    // </BrowserRouter>
<>
   <UserContextProvider>
      <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage/>}/> 
                <Route path='/login'  element={<LoginPage/>}/>
                <Route path='/register'  element={<RegisterPage/>}/>
                <Route path='/create'  element={<CreatePost/>}/>
                <Route path='/post/:id'  element={<PostPage/>}/>
                <Route path='/edit/:id'  element={<EditPost/>}/>
                </Route>
            </Routes>
          </Router>
   </UserContextProvider>
  
</>

  );
};

export default App;
