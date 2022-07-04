import React from 'react'
import { render, screen } from '@testing-library/react'
import DashboardPage from './DashboardPage'

test('renders learn react link', () => {
    render(<DashboardPage />)
    const linkElement = screen.getByText(/Welcome to Carbo Credit/i)
    expect(linkElement).toBeInTheDocument()
})
