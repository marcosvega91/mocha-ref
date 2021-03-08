import React from 'react';
import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from '../App';

describe('App tests', () => {
  const server = setupServer(
    rest.post('http://localhost:8080/api/getList', (req, res, ctx) => {
      return res(
        ctx.set('access-control-allow-origin', '*'),
        ctx.json({
          msgCode: 0,
          msgDesc: 'Request processed successfully',
          data: {
            data: {
              createdBy: 'CJ',
              createdDate: '02/18/2021',
            },
            pagination: {
              pageNo: req.body.pagination.pageNo,
              pageSize: req.body.pagination.pageSize,
              total: 1,
              sortedColumn: req.body.pagination.sortedColumn,
              sortedType: req.body.pagination.sortedType,
            },
          },
        })
      );
    })
  );

  before(() => {
    server.listen();
  });

  after(() => {
    server.close();
  });

  it('renders App without crashing', () => {
    render(<App />);
  });
});
