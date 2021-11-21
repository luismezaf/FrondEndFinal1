export const mainEndpoint =
  "https://my-json-server.typicode.com/davinun99/dummy-json-server/";

  export const getFechaForQuery = (fecha: Date)=> {
    const month = (fecha.getMonth() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const date = (fecha.getDate() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const fechaQuery:string = fecha.getFullYear() + month + date;
    return fechaQuery;
}