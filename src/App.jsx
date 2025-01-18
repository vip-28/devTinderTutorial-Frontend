import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { Premium } from "./components/Premium";
import { Admin } from "./components/Admin";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Body />
                </div>
              }
            >
              {/* Children elements inside "/" */}

              <Route
                path="/login"
                element={
                  <div>
                    <Login />
                  </div>
                }
              />
              <Route
                path="/"
                element={
                  <div>
                    <Feed />
                  </div>
                }
              />
              <Route
                path="/profile"
                element={
                  <div>
                    <Profile />
                  </div>
                }
              />
              <Route path="/user/connections" element={<Connections />} />
              <Route path="/user/viewRequest" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/chat/:id" element={<Chat/>}/>

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
