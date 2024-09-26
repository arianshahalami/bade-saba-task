export const useCheckCredentials = () => {
   return Boolean(localStorage.getItem("token"));
};
