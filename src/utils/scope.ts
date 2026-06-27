import {Constants} from "@utils/constants"

let userScopes: any[];
let userInfo: { superAdmin: any; };

const init = () => {
    const localUserScopes: any = typeof window !== "undefined" ? localStorage.getItem(Constants.USER_SCOPES) : null;
    userScopes = JSON.parse(localUserScopes);
    const localUserInfo: any = typeof window !== "undefined" ? localStorage.getItem(Constants.USER_INFO) : null;
    userInfo = JSON.parse(localUserInfo);
};

export class Scope {
    static checkScopes = (scopes: any) => {
        init();
        return (userInfo && userInfo.superAdmin) ? true : userScopes?.length > 0 ? userScopes.some(function (v: any) {
            return scopes.indexOf(v) >= 0;
        }) : false;
    }

    static checkScopesParent = (parent: string): boolean => {
        init();
        return (userInfo && userInfo.superAdmin) ? true : (userScopes?.length ?? 0) > 0 ? !!userScopes.filter((item) => item.includes(parent)).length : false;
    };
}