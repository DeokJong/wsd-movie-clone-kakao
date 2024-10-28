import { createFileRoute } from '@tanstack/react-router'

import { TestService } from '../client'

export const Route = createFileRoute('/')({
  component: index,
})

function index() {
  return (
    <>
      <button onClick={() => TestService.test().then(console.log)}>Test</button>
      <div>
        <h1>Index</h1>
      </div>
    </>
  )
}
