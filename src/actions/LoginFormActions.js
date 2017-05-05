export function loginPage(status) {
    return {
        type: 'LOGIN_FORM',
        state: status
    };
}