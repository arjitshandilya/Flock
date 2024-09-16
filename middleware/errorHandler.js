// middlewares/errorHandler.js

export const errorHandler = (handler) => {
  return async (c) => {
    try {
      return await handler(c);
    } catch (error) {
      console.error("Error occurred:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  };
};
