import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { rest } from 'msw';

import PokeList from '../index';
import { result } from '../__data_mocks__/pokemonColorResult';

/**
 * Register API mock with return
 * mock data pokemon color
 */
const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon-color', (_req, res, ctx) => {
    return res(ctx.json(result));
  }),
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should successfully fetch data and show pokemon colors', async () => {
  render(<PokeList />);

  /**
   * Test assertion for loading text.
   * Should appear on initial rendering because
   * we do data fetching
   */
  expect(screen.getByText(/loading/i)).toBeInTheDocument();


  /**
   * Waiting async process using waitFor
   * until data is fetched from server
   * and rendered in the DOM.
   */
  await waitFor(() => {
    return expect(screen.getAllByTestId('pokemonColors')).toHaveLength(5);
  });
})

test('should handle server error', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error');

  /**
   * Lets re-mock the API to return status 500
   */
  server.use(
    rest.get('https://pokeapi.co/api/v2/pokemon-color', (_req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<PokeList />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();


  /**
   * Waiting async process using waitFor
   * until data is fetched from server
   * and showing error message
   */
  await waitFor(() => {
    return expect(consoleErrorSpy).toHaveBeenCalledWith('response is not ok(500): Internal Server Error');
  });
})
