import React from 'react'
import {
    fireEvent,
    queryByTestId,
    render,
    screen,
} from '@testing-library/react'
import Login from './LoginPage'
import * as router from 'react-router'
import * as ReactRedux from 'react-redux'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

jest.mock('react-redux', () => {
    const { Provider, useSelector } = jest.requireActual('react-redux')

    return {
        useDispatch: jest.fn(),
        // we ensure that these are original
        useSelector,
        Provider,
    }
})

test('render sLogin Me in to React', () => {
    render(<Login />)
    const linkElement = screen.getByText(/Sign in to Carbon Credit/i)
    expect(linkElement).toBeInTheDocument()
})

// test("clicking login button", () => {
//   render(<Login />);

//   const button = screen.getByText(/Login Me in to React/i);
//   fireEvent.click(button);

//   expect(navigate).toHaveBeenCalledTimes(1);
// });

// describe("test", () => {
//   test("should work", () => {
//     // const login = jest.fn();
//     // const { queryByTestId } = render(<Login />);

//     // const button = queryByTestId("loginBtn");
//     // expect(button).toBeInTheDocument();
//     // fireEvent.click(button);
//     // expect(login.mock.calls.length).toBe(1);
//     // expect(button).toHaveBeenCalledTimes(1);
//   });
// });
