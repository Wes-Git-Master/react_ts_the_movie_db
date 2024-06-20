export const getAuthUrl = (requestToken: string, redirectTo: string = 'http://localhost:3000/authenticated'): string => {
    return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectTo}`;
};
