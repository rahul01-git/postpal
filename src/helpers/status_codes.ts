export const statusData = {
  errors: {
    badRequest: {
      code: 400,
      description: "Bad Request - The server could not understand the request.",
    },
    unauthorized: {
      code: 401,
      description: "Unauthorized - Authentication is required and has failed or has not been provided.",
    },
    forbidden: {
      code: 403,
      description: "Forbidden - The server understood the request, but it refuses to authorize it.",
    },
    notFound: {
      code: 404,
      description: "Not Found - The requested resource could not be found on the server.",
    },
    internalServerError: {
      code: 500,
      description: "Internal Server Error - The server encountered a situation it doesn't know how to handle.",
    },
    badGateway: {
      code: 502,
      description: "Bad Gateway - The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed.",
    },
  },
  success: {
    okay: {
      code: 200,
      description: "OK - The request has succeeded and the server has returned the requested data.",
    },
    created: {
      code: 201,
      description: "Created - The request has been fulfilled and a new resource has been created.",
    },
    noContent: {
      code: 204,
      description: "No Content - The server has successfully fulfilled the request, but there is no additional information to send back.",
    },
  },
};

export const status = {
  errors: Object.fromEntries(
    Object.entries(statusData.errors).map(([key, value]) => [key, value.code])
  ),
  success: Object.fromEntries(
    Object.entries(statusData.success).map(([key, value]) => [key, value.code])
  ),
};
