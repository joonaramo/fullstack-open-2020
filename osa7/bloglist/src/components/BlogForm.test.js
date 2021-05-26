import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('BlogForm updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'React Blog' },
  });
  fireEvent.change(author, {
    target: { value: 'John Doe' },
  });
  fireEvent.change(url, {
    target: { value: 'https://example.com/blog' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('React Blog');
  expect(createBlog.mock.calls[0][0].author).toBe('John Doe');
  expect(createBlog.mock.calls[0][0].url).toBe('https://example.com/blog');
});
