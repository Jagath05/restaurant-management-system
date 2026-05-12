import React from "react";
import {
    Navigate
} from "react-router-dom";

export default function
AdminProtectedRoute({
    children
}) {

    const adminData =
        localStorage.getItem(
            "admin"
        );

    let admin =
        null;

    try {

        admin =
            JSON.parse(
                adminData
            );

    } catch {

        localStorage.removeItem(
            "admin"
        );
    }

    if(
        !admin ||
        !admin.id
    ){

        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }

    return children;
}