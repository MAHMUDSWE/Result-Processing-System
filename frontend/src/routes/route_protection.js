
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutesAfterLogin = ({ children }) => {
    var role = 2;
    var studentIsLoggedIn = localStorage.getItem("studentIsLoggedIn");
    var teacherIsLoggedIn = localStorage.getItem("teacherIsLoggedIn");
    var adminstratorIsLoggedIn = localStorage.getItem("adminstratorIsLoggedIn");

    if (!studentIsLoggedIn && !teacherIsLoggedIn && !adminstratorIsLoggedIn && role === 2) {
        return <Navigate to="/" replace />;
    }
    return children;
}

const StudentsRoutesProtection = ({ children }) => {
    var studentIsLoggedIn = localStorage.getItem("studentIsLoggedIn");
    var teacherIsLoggedIn = localStorage.getItem("teacherIsLoggedIn");
    var adminstratorIsLoggedIn = localStorage.getItem("adminstratorIsLoggedIn");

    if (!studentIsLoggedIn && !teacherIsLoggedIn && !adminstratorIsLoggedIn) {
        return <Navigate to="/" replace />;
    }
    else if (!studentIsLoggedIn && teacherIsLoggedIn && !adminstratorIsLoggedIn) {
        return <Navigate to="/teacher_workspace" replace />;
    }
    else if (!studentIsLoggedIn && !teacherIsLoggedIn && adminstratorIsLoggedIn) {
        return <Navigate to="/admin_workspace" replace />;
    }
    return children;
}

const TeacherRoutesProtection = ({ children }) => {
    var studentIsLoggedIn = localStorage.getItem("studentIsLoggedIn");
    var teacherIsLoggedIn = localStorage.getItem("teacherIsLoggedIn");
    var adminstratorIsLoggedIn = localStorage.getItem("adminstratorIsLoggedIn");

    if (!studentIsLoggedIn && !teacherIsLoggedIn && !adminstratorIsLoggedIn) {
        return <Navigate to="/" replace />;
    }
    else if (studentIsLoggedIn && !teacherIsLoggedIn && !adminstratorIsLoggedIn) {
        return <Navigate to="/student_workspace" replace />;
    }
    else if (!studentIsLoggedIn && !teacherIsLoggedIn && adminstratorIsLoggedIn) {
        return <Navigate to="/admin_workspace" replace />;
    }
    return children;
}

const AdminRoutesProtection = ({ children }) => {
    var studentIsLoggedIn = localStorage.getItem("studentIsLoggedIn");
    var teacherIsLoggedIn = localStorage.getItem("teacherIsLoggedIn");
    var adminstratorIsLoggedIn = localStorage.getItem("adminstratorIsLoggedIn");

    if (!studentIsLoggedIn && !teacherIsLoggedIn && !adminstratorIsLoggedIn) {
        return <Navigate to="/" replace />;
    }
    else if (studentIsLoggedIn && !teacherIsLoggedIn && !adminstratorIsLoggedIn) {
        return <Navigate to="/student_workspace" replace />;
    }
    else if (!studentIsLoggedIn && teacherIsLoggedIn && !adminstratorIsLoggedIn) {
        return <Navigate to="/teacher_workspace" replace />;
    }
    return children;
}

const ProtectedRoutesBeforeLogin = ({ children }) => {
    var role = 2;
    var studentIsLoggedIn = localStorage.getItem("studentIsLoggedIn");
    var teacherIsLoggedIn = localStorage.getItem("teacherIsLoggedIn");
    var adminstratorIsLoggedIn = localStorage.getItem("adminstratorIsLoggedIn");

    if (studentIsLoggedIn && role === 2) {
        return <Navigate to="/student_workspace" replace />;
    }
    else if (teacherIsLoggedIn && role === 2) {
        return <Navigate to="/teacher_workspace" replace />;
    }
    else if (adminstratorIsLoggedIn && role === 2) {
        return <Navigate to="/admin_workspace" replace />;
    }
    return children;
}

export {
    ProtectedRoutesAfterLogin,
    ProtectedRoutesBeforeLogin,
    StudentsRoutesProtection,
    TeacherRoutesProtection,
    AdminRoutesProtection
};