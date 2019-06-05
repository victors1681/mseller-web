export const createActions = (methodName, types) => ({
  [[methodName] + "Request"]: payload => ({
    type: types[0],
    payload
  }),
  [[methodName] + "Success"]: payload => ({
    type: types[1],
    payload
  }),
  [[methodName] + "Failed"]: payload => ({
    type: types[2],
    payload
  })
});
