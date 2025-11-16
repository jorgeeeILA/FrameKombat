import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Framekombat heading', () => {
  render(<App />)
  expect(screen.getByText(/Framekombat/i)).toBeInTheDocument()
})
