import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import PublicNavBar from "../../components/PublicNavBar"

function DFS(){
    return <div>
        <PublicNavBar></PublicNavBar>
        <h1>DFS</h1>
    </div>
}

export default DFS