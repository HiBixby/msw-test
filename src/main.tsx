import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

async function enableMocking() {
  // 일반적인 경우
  // if (process.env.NODE_ENV !== 'development') {

  // vite의 경우
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  // 서비스 워커 시작
  return worker.start();
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
