import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonTitle from '../index';

test('should show title when click cta', () => {
  render(<ButtonTitle />);

  /**
   * Lets make sure the title is not shown
   * on initial rendered
   */
  const title = screen.queryByText(/the title/i); // we use queryByText to avoid throwing error if using getByText
  expect(title).not.toBeInTheDocument(); // test assertion for non existence element in the DOM

  /**
   * Lets check if the button exist first
   */
  const btnClickMe = screen.getByTestId('btnClickMe'); // element selector
  expect(btnClickMe).toBeInTheDocument(); // test assertion

  /**
   * Lets click the button
   * and see if the title shown
   */
  userEvent.click(btnClickMe) // triggering click event on btnClickMe button
  expect(screen.getByText(/the title/i)).toBeInTheDocument(); // element selector with regex pattern + test assertion
});
