import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.useRealTimers();

const wait = (time = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

test('renders the app component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Contacts/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the searchbox component', () => {
  render(<App />);
  expect(screen.getByRole('textbox').toBeInTheDocument)
  expect(screen.getByPlaceholderText('Search').toBeInTheDocument)
  expect(screen.getByAltText('search-icon').toBeInTheDocument)
});

test('renders the searchbox placeholder properly', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Search').toBeInTheDocument)
});
test('renders the searchbox icon properly', () => {
  render(<App />);
  expect(screen.getByAltText('search-icon').toBeInTheDocument)
});

test('on initial page load, the text-`Show all` shouldnt be visible', () => {
  render(<App />);
  expect(screen.queryByText(/Show all/)).toBeNull();
});


test('on initial page load, the text-`Filter Favourites ` shouldnt be visible', () => {
  render(<App />);
  expect(screen.queryByText(/Filter Favourites/).toBeInTheDocument);
});


test('Search functionality is working with the contact-Roselyn Hahn', async () => {
  render(<App />);
  // fireEvent.change(screen.getByRole('textbox'), {
  //   target: { value: 'rose' },
  // });
  await userEvent.type(screen.getByRole('textbox'), 'rose');
  // Giving a time delay for UseEffect to execute
  await wait(2000).then(() => {
    expect(screen.queryByText(/Roselyn Hahn/)).toBeInTheDocument();
    expect(screen.queryByText(/Jeffrey Ryan/)).toBeNull();
  });
});

test('Search functionality is working with the contact-Roselyn Hahn, it wont display unmatching results', async () => {
  render(<App />);
  await userEvent.type(screen.getByRole('textbox'), 'rose');
  // Giving a time delay for UseEffect to execute
  await wait(2000).then(() => {
    expect(screen.queryByText(/Jeffrey Ryan/)).toBeNull();
  });


});
test('adding a contact as favourite feature works', async () => {
  render(<App />);
  await userEvent.click(screen.queryByText(/Roselyn Hahn/));
  await wait(1000).then(async () => {
    await userEvent.click(screen.getByAltText(/fav-icon/));
  });
  await wait(1000).then(async () => {
    await userEvent.click(screen.getByAltText(/close-icon/));
  });
  await wait(1000).then(async () => {
    await userEvent.click(screen.queryByText(/Filter Favourites/));
  });
  expect(screen.queryByText(/Roselyn Hahn/)).toBeInTheDocument();
  expect(screen.queryByText(/Jeffrey Ryan/)).toBeNull();
});

test('removing a contact from favourite feature works', async () => {
  render(<App />);
  await userEvent.click(screen.queryByText(/Roselyn Hahn/));
  await wait(1000).then(async () => {
    await userEvent.click(screen.getByAltText(/fav-icon/));
  });
  await wait(1000).then(async () => {
    await userEvent.click(screen.getByAltText(/fav-icon/));
  });
  await wait(1000).then(async () => {
    await userEvent.click(screen.getByAltText(/close-icon/));
  });
  await wait(1000).then(async () => {
    await userEvent.click(screen.queryByText(/Filter Favourites/));
  });
  expect(screen.queryByText(/Roselyn Hahn/)).toBeNull();
});