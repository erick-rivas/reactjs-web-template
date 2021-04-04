import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data'
import Details from 'seed/examples/components/scores/Details';

test('examples/components/scores/Details', () => {
  mockGql.useDetail({"score": data.GQL_SCORE});
  mockGql.useDelete({"score": data.GQL_SCORE});
  render(<Details />);
  expect(screen).toBeDefined()
});