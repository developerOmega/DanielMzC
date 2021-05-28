const setCookie = (cname, cvalue) => document.cookie = `${cname} = ${cvalue};`;

function getCookie(cname) {
  const decodedCookie = decodeURIComponent(document.cookie);  
  const cookies = decodedCookie.split(';');

  const data = cookies.filter( cookie => {
    const cooArr = cookie.split("=");
    return cooArr[0] == cname;
  });

  if(data[0]) {
    return data[0].split("=")[1];
  }

  return "";
} 


export {setCookie, getCookie};