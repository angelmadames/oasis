export const httpHandlers = {
  async response(result: Response) {
    if (!result.ok) {
      const errorMessage = `Request failed with status: ${result.status}`;
      const errorData = await result.json().catch(() => null);
      throw new Error(
        `${errorMessage}\n${errorData ? JSON.stringify(errorData) : ''}`,
      );
    }

    return result;
  },
};

export default httpHandlers;
