import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";

import { App } from "@/App.tsx";
import { GeneralErrorHandler } from "@/components/general-error";
import { NotFoundView } from "@/modules/error";
import { LoginView } from "@/modules/authentication";

export const router = createBrowserRouter([
   {
      element: (
         <Suspense>
            <App />
         </Suspense>
      ),
      errorElement: <GeneralErrorHandler />,
      children: [
         {
            path: "/",
            element: <Navigate to="/permissions" />,
         },
         {
            path: "/auth/login",
            element: <LoginView />,
         },
         {
            path: "/permissions",
            element: <div>dashboard</div>,
         },
         {
            path: "*",
            element: <NotFoundView />,
         },
      ],
   },
]);
