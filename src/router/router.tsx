import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";

import { GeneralErrorHandler } from "@/components/general-error";
import { NotFoundView } from "@/modules/error";
import { App } from "@/App.tsx";

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
            element: <div>Hello world!</div>,
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
