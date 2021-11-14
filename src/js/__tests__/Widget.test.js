import Widget from '../Widget';

test('valid', () => {
  const widget = new Widget();
  const received = widget.checkValidity('51.50851, -0.1257');
  expect(received).toEqual(['51.50851, -0.1257']);
});

test('empty form', () => {
  const widget = new Widget();
  const received = widget.checkValidity('');
  expect(received).toBe(null);
});

test('not valid with number', () => {
  const widget = new Widget();
  const received = widget.checkValidity('675667,4883939');
  expect(received).toBe(null);
});

test('not valid', () => {
  const widget = new Widget();
  const received = widget.checkValidity('fgdhhdhd, 34.99393');
  expect(received).toBe(null);
});
