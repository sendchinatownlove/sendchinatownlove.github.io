import React from 'react';
import { render } from '@testing-library/react';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

/**
 * Render With Router Test Fixture
 * @param ui : the React Component you want to test
 * @param {startingPath, endingPath}
 *  - @arg startingPath is the URL the test is starting at
 *  - @arg endingPath is the URL the test should end at and is being asserted
 * @example
 *  test('My example test', async () => {
 *    const MyRedirect = () = <Redirect to='/test'/>
 *    const { getByText } = renderWithRouter(<MyRedirect/>, {'/','/test'})
 *
 *    await waitFor(() => {
 *      expect(getByText('/test')).toBeInTheDocument())
 *    })
 *  })
 */

const renderWithRouter = (ui, { startingPath, endingPath }) => {
  const start = startingPath || '/';
  // Build history object with initial location
  const history = createBrowserHistory();
  history.push(start);
  console.log(history);

  return {
    history,
    ...render(
      <RouterTestFixture
        startingPath={start}
        endingPath={endingPath}
        history={history}
      >
        {ui}
      </RouterTestFixture>
    ),
  };
};

export default renderWithRouter;
export const resetRouterFixture = () =>
  renderWithRouter(<Route path="/" render={() => <Redirect to="/" />} />, {
    startingPath: '/',
    endingPath: '/',
  });
/**
 * TEST FIXTURES BELOW
 * - A Router test fixture that sets up the two routes to test
 * - A UIWrapper that renders with the starting path, and the React component under test
 * - A simple component that renders when the ending path is clicked on
 *
 */
const EndPathAssert = ({ endingPath }) => <p>{endingPath}</p>;
const UIWrapper = ({ startingPath, children }) => (
  <div>
    <p>{startingPath}</p>
    {children}
  </div>
);

const RouterTestFixture = ({ children, startingPath, endingPath, history }) => (
  <Router history={history}>
    <Route
      path={startingPath}
      exact={true}
      render={() => (
        <UIWrapper startingPath={startingPath}>{children}</UIWrapper>
      )}
    />
    <Route
      path={endingPath}
      render={() => <EndPathAssert endingPath={endingPath} />}
    />
  </Router>
);
