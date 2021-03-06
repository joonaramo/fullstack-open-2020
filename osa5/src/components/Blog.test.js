import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders title and author, not url and likes by default', () => {
  const blog = {
    title: 'React Blog',
    author: 'John Doe',
    url: 'https://example.com/blog',
    likes: 8,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('React Blog');
  expect(component.container).toHaveTextContent('John Doe');
  expect(component.container).not.toHaveTextContent('https://example.com/blog');
  expect(component.container).not.toHaveTextContent('likes 8');
});

test('clicking view button shows url and likes', async () => {
  const blog = {
    title: 'React Blog',
    author: 'John Doe',
    url: 'https://example.com/blog',
    likes: 8,
    user: {
      username: 'Mary Poppins',
    },
  };
  const component = render(<Blog blog={blog} />);
  const button = component.getByText('view');
  fireEvent.click(button);
  expect(component.container).toHaveTextContent('https://example.com/blog');
  expect(component.container).toHaveTextContent('likes 8');
});

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    id: '1234567',
    title: 'React Blog',
    author: 'John Doe',
    url: 'https://example.com/blog',
    likes: 8,
    user: {
      username: 'Mary Poppins',
    },
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} likeBlog={mockHandler} />);
  const viewButton = component.getByText('view');
  fireEvent.click(viewButton);
  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
