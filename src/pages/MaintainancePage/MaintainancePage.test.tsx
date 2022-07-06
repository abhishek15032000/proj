import React from 'react'
import { render, screen } from '@testing-library/react'
import MaintainancePage from './MaintainancePage'

test('renders MaintainancePage', () => {
    render(<MaintainancePage />)
    const linkElement = screen.getByText(/MaintainancePage/i)
    expect(linkElement).toBeInTheDocument()
})
