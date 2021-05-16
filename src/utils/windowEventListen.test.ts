import {
  addWindowEventListener,
  removeWindowEventListener,
  clearGlobalState,
} from './windowEventListen';

const addEventListener = window.addEventListener;
beforeEach(() => {
  clearGlobalState();
});

afterEach(() => {
  window.addEventListener = addEventListener;
});

test('it should listen window event with addWindowEventListener', () => {
  const mockListener = jest.fn();
  const mockListener2 = jest.fn();
  addWindowEventListener('resize', mockListener);
  addWindowEventListener('resize', mockListener);
  addWindowEventListener('resize', mockListener2);

  window.dispatchEvent(new Event('resize'));
  expect(mockListener).toBeCalledTimes(2);
  expect(mockListener2).toBeCalledTimes(1);
});

test('it should add only one window event listener', () => {
  const mockWindowEventListener = jest.fn();
  window.addEventListener = mockWindowEventListener;
  addWindowEventListener('resize', () => {
    /* nothing */
  });
  addWindowEventListener('resize', () => {
    /* nothing */
  });

  expect(mockWindowEventListener).toBeCalledTimes(1);
});

test('it should remove listener with removeWindowEventListener', () => {
  const mockListener = jest.fn();
  addWindowEventListener('resize', mockListener);
  window.dispatchEvent(new Event('resize'));
  expect(mockListener).toBeCalledTimes(1);

  removeWindowEventListener('resize', mockListener);
  window.dispatchEvent(new Event('resize'));
  expect(mockListener).toBeCalledTimes(1);
});
