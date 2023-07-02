import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
  let container, mockDelete, mockLike, blog;
  beforeEach(() => {
    blog = {
      title: 'test',
      author: 'author test',
      url: 'testurl.com',
      likes: '17',
      user: {
        name: 'Tester',
        username: 'Testour',
      },
    };

    mockDelete = jest.fn();
    mockLike = jest.fn();

    container = render(
      <Blog
        blog={blog}
        currentUser={blog.user}
        handleDelete={mockDelete}
        handleLike={mockLike}
      />
    ).container;
  });

  test('display only title and author', () => {
    expect(container.querySelector('.title')).toBeDefined();
    expect(container.querySelector('.title')).toHaveTextContent(
      `${blog.title} ${blog.author}`
    );
    expect(container.querySelector('.details')).toBeDefined();

    expect(container.querySelector('.title')).not.toHaveStyle('display: none');
    expect(container.querySelector('.details')).toHaveStyle('display: none');
  });

  test('display url and likes when view button is clicked', async () => {
    const user = userEvent.setup();
    const button = container.querySelector('.title button');

    await user.click(button);

    expect(container.querySelector('.details')).not.toHaveStyle(
      'display: none'
    );
    expect(container.querySelector('.details')).toHaveTextContent(
      `${blog.url}likes: ${blog.likes}like${blog.user.name}remove`
    );
  });

  test('likes handler is called twice when button is clicked twice', async () => {
    const user = userEvent.setup();
    const viewBtn = container.querySelector('.title button');
    const likeBtn = container.querySelector('.details p button');

    await user.click(viewBtn);

    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockLike.mock.calls).toHaveLength(2);
  });
});
