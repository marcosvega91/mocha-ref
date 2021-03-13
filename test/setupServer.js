import { setupServer } from "msw/node";
import { rest } from "msw";

// export the server instance so you can `server.use` as needed
export const server = setupServer(
  rest.post("http://localhost:8080/api/getList", (req, res, ctx) => {
    return res(
      ctx.set("access-control-allow-origin", "*"),
      ctx.json({
        msgCode: 0,
        msgDesc: "Request processed successfully",
        data: {
          data: {
            createdBy: "CJ",
            createdDate: "02/18/2021",
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
  }),
  rest.post("http://localhost:8080/api/getChildList", (req, res, ctx) => {
    return res(
      ctx.set("access-control-allow-origin", "*"),
      ctx.json({
        msgCode: 0,
        msgDesc: "Request processed successfully",
        data: {
          data: {
            createdBy: "CJ Child",
            createdDate: "02/18/2021",
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
