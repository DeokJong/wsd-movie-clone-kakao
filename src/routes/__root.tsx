import React, { Suspense } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

const TanStackRouterDevtools =
  import.meta.env.VITE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })))

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
})
