import React, { useContext } from "react"
import shopContext from "../../context/shopContext.js"
import { Outlet, Navigate } from "react-router-dom"
export default function Protected() {
    const { token } = useContext(shopContext)
    return token === "" || !token ? <Navigate to={"/"} replace /> : <Outlet />
}