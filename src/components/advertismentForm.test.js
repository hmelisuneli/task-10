import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AdvertismentForm from './advertismentForm'; 
import rootReducer from '../reducers/rootReducer';


const renderWithRedux = (
  component,
  { initialState, store: initialStore } = {}
) => {
  const store = initialStore || createStore(rootReducer, initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('AdvertismentForm Component', () => {
  test('renders Add Advertisment form', () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(<AdvertismentForm />);
    expect(getByText('Add Advertisement')).toBeInTheDocument(); // Updated matcher
    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
  });

  test('renders Edit Advertisment form', () => {
    const advertismentToEdit = { id: 1, title: 'Test Title', description: 'Test Description' };
    const { getByText, getByPlaceholderText } = renderWithRedux(
      <AdvertismentForm advertismentToEdit={advertismentToEdit} />
    );
    expect(getByText('Edit Advertisement')).toBeInTheDocument(); // Updated matcher
    expect(getByPlaceholderText('Title')).toHaveValue('Test Title');
    expect(getByPlaceholderText('Description')).toHaveValue('Test Description');
  });
  test('dispatches addAdvertisment action on Add button click', () => {
    const mockDispatch = jest.fn();
    const { getByText, getByPlaceholderText } = renderWithRedux(
      <AdvertismentForm />,
      { initialState: { advertisments: [] }, store: { dispatch: mockDispatch } }
    );

    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'New Title' } });
    fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'New Description' } });
    fireEvent.click(getByText('Add Advertisement')); // Updated text

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_ADVERTISEMENT',
      payload: { title: 'New Title', description: 'New Description', id: expect.any(String) },
    });
  });
});
