/* eslint-disable @typescript-eslint/no-explicit-any */

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
};

export const userProtectedRoutes: RouteConfig = {
    patterns: [/^\dashboard/],
    exact: [],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if(routes.exact.includes(pathname)) {
        return true;
    }

    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "USER" | null => {
    if(isRouteMatches(pathname, userProtectedRoutes)) {
        return "USER";
    }
    
    return null;
};

export const getDefaultDashboardRoute = (role: any): string => {
    if(role === "USER") {
        return "/dashboard";
    }
    return "/";
};

export const isValidRedirectForRole = (redirectPath: string, role: any): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if(routeOwner === null || routeOwner === "USER") {
        return true;
    }

    if(routeOwner === role) {
        return true;
    }

    return false;
};