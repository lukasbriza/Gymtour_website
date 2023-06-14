export const hasCustomErrorObject = (error: unknown) => {
  return (
    typeof error === "object" &&
    error !== null &&
    error.hasOwnProperty("data") &&
    error.hasOwnProperty("errorMap")
  );
};
