export function throwAsServiceError(error: any): never {
  if (error?.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else if (error?.response?.statusText) {
    throw new Error(error.response.statusText);
  }
  throw new Error("API Error");
}
