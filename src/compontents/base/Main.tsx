import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute"
import {Catalog, NotFound, Profile, Register} from "../../pages";
import {useSelector} from "react-redux";
import React from "react";
import {selectAuth} from "../../redux/auth/authSlice";
import ErrorPopup from "../errorPopup/ErrorPopup";

const Main: React.FC<any> = ({popupError}) => {
    const {isLoggedIn} = useSelector(selectAuth);

    return (
        <main className="content">
            <Routes>
                <Route path="/signup" element={<Register showPopupError={popupError}/>}/>
                <Route path="/" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Catalog/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <ErrorPopup/>
        </main>
    )
}
export default Main;