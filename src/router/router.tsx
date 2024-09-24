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
            element: <Navigate to="/auth/username" />,
         },

         {
            path: "/auth/login",
            element: <div>Hello world!</div>,
         },
         {
            path: "/auth/login",
            element: <div>Hello world!</div>,
         },
         {
            path: "*",
            element: <NotFoundView />,
         },
      ],
   },
]);
