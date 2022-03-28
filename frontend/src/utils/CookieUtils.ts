// helper function to get a cookie from user
export const getCookie = (name: string) => {
    const userCookieData = document.cookie.split(';');
    const userCookies = userCookieData.map(e => e.split('='));

    const resultCookie = userCookies.find((c) => c[0].trim() === name)

    if(resultCookie && resultCookie[1]) {
        return resultCookie[1].trim()
    }

    return "";
}

// helper function to set a user cookie
export const setCookie = (name: string, content: string, duration?: number) => {
    const currentDate: Date = new Date();
    const currentTime: number = currentDate.getTime();
    const day: number = 24 * 60 * 60 * 1000;
    const expiration: number = currentTime + (duration || 1 * day);
    currentDate.setTime(expiration);
    const cookieData = `${name}=${content};expires=${currentDate.toUTCString()}`;
    document.cookie = cookieData;
}

// helper function to clear cookies
export const clearCookie = () => {
    document.cookie = `id_token='';expires=${new Date()}`;
    document.cookie = `access_token='';expires=${new Date()}`;
    document.cookie = `refresh_token='';expires=${new Date()}`;
}