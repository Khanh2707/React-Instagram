import React from 'react'
import { RouterProvider } from 'react-router-dom';

import routes from "./routes/index.js";

export default function App() {
  return (
    <RouterProvider router={routes} />
  )
}
