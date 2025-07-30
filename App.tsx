import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import Programm from "./Program";
import UnderConstruction from "./SUC";
import { PersistGate } from "redux-persist/integration/react";
const { store, persistor } = reduxStore();
//const store = reduxStore().store;

// Lazy load the components
const Home = lazy(() => import("./Home"));
const Level = lazy(() => import("./Level"));
const Platform = lazy(() => import("./Platform"));
const LoginForm = lazy(() => import("./Login"));
const Edition = lazy(() => import("./Edition"));
const Dashboard = lazy(() => import("./Dashboard"));
const Certification = lazy(() => import("./Certification"));
const Help = lazy(() => import("./Help"));
const Reports = lazy(() => import("./Reports"));
const Account = lazy(() => import("./Account"));
const LambdaLevel = lazy(() => import("./LambdaLevel"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <UnderConstruction />
    ),
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    ),
  },
  {
    path: "/level",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Level />
      </Suspense>
    ),
  },
  {
    path: "/certification",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Certification />
      </Suspense>
    ),
  },
  {
    path: "/platform",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Platform />
      </Suspense>
    ),
  },
  {
    path: "/edition",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Edition />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    ),
    children: [
      {
        path: "help",
        element: <Suspense fallback={<div>Loading...</div>}><Help /></Suspense>
      },
      {
        path: "reports",
        element: <Suspense fallback={<div>Loading...</div>}><Reports /></Suspense>
      },
      {
        path: "accounts",
        element: <Suspense fallback={<div>Loading...</div>}><Account /></Suspense>
      },
      {
        path: "lambda",
        element: <Suspense fallback={<div>Loading...</div>}><LambdaLevel /></Suspense>
      },
      {
        path: "alpha",
        element: <Suspense fallback={<div>Loading...</div>}><Level state={{ stage: 'alpha' }} /></Suspense>
      },
      {
        path: "beta",
        element: <Suspense fallback={<div>Loading...</div>}><Level state={{ stage: 'beta' }} /></Suspense>
      },
      {
        path: "gamma",
        element: <Suspense fallback={<div>Loading...</div>}><Level state={{ stage: 'gamma' }} /></Suspense>
      }
    ]
  },
  {
    path: "/program",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Programm />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
