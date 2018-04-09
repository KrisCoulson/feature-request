import React from 'react';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
  it('should render', () => {
    expect(<Sidebar />).toMatchSnapshot();
  });
})
