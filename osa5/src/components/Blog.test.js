import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
