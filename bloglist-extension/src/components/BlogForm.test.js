import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

describe('<BlogForm />', () => {
  let container, mockCreate;
  beforeEach(() => {
    mockCreate = jest.fn();

    container = render(<BlogForm handleCreate={mockCreate} />).container;
  });

  test('blog creation is handled right', async () => {
    const user = userEvent.setup();

    const titleInput = container.querySelector('[name="title"]');
    const authorInput = container.querySelector('[name="author"]');
    const urlInput = container.querySelector('[name="url"]');

    const submitBtn = container.querySelector('[type="submit"]');

    await user.type(titleInput, 'test title');
    await user.type(authorInput, 'test author');
    await user.type(urlInput, 'test url');

    await user.click(submitBtn);

    expect(mockCreate.mock.calls).toHaveLength(1);
    expect(mockCreate.mock.calls[0][0]).toEqual({
      title: 'test title',
      author: 'test author',
      url: 'test url',
    });
  });
});
