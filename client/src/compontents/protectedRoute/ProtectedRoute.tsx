import React from "react";
import {Navigate} from "react-router-dom";
import {IProtectedRoute} from "./types"

const ProtectedRoute: React.FC<IProtectedRoute> = ({children, isLoggedIn}) => {
    return isLoggedIn ? children : <Navigate to="/signup"/>
};

export default ProtectedRoute;