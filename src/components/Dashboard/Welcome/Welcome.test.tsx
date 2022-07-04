import React from 'react'
import { render, screen } from '@testing-library/react'
import Welcome from './Welcome'

test('renders learn react link', () => {
    render(<Welcome />)
    const linkElement = screen.getByText(/Welcome to Carbo Credit/i)
    expect(linkElement).toBeInTheDocument()
})
