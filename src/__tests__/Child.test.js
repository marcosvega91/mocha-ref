import React from 'react';
import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Child from '../Child';

describe('Child tests', () => {
  const server = setupServer(
    rest.post('http://localhost:8080/api/getChildList', (req, res, ctx) => {
      return res(
        ctx.set('access-control-allow-origin', '*'),
        ctx.json({
          msgCode: 0,
          msgDesc: 'Request processed successfully',
          data: {
            data: {
              createdBy: 'CJ Child',
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

  it('renders Child without crashing', () => {
    render(<Child />);
  });
});
