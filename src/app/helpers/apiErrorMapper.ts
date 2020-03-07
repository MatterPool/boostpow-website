import ErrorConstants from "./error-constants";

export function apiMapErrorString(err: string): string {

    // Account
    if (err === 'EMAIL_EXISTS') {
        return `Email is already in use. Login or choose another email`;
    }

    if (err === 'INVALID_LOGIN') {
        return `Email or password is incorrect. Please try again.`;
    }

    if (err === 'WORKERGROUP_NAME_EXISTS') {
        return `Already in use. Please choose another name.`;
    }

    return ErrorConstants.GENERIC_SYSTEM_ERROR
}
