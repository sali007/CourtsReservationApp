export function loginPage(status, pageType) {
    console.log('Login page call')
    return {
        type: 'LOGIN_PAGE',
        state: status,
        pageType:pageType,
    };
}
