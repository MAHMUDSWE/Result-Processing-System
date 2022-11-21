const jwt = require("jsonwebtoken");

function isPublicRoute(req) {
    console.log(req.originalUrl);
    if (req.originalUrl == "/student_login") {
        console.log("inside");
        return true;
    }
    else if (req.originalUrl == "/teacher_login") {
        console.log("inside");
        return true;
    }
    else if (req.originalUrl == "/admin_login") {
        console.log("inside");
        return true;
    }
    else if (req.originalUrl == "/student_signup") {
        console.log("inside");
        return true;
    }
    else if (req.originalUrl == "/teacher_signup") {
        console.log("inside");
        return true;
    }
    else if (req.originalUrl == "/adminstrator_signup") {
        console.log("inside");
        return true;
    }

    else {
        return false;
    }
}


const jwtAuthentication = (req, res, next) => {

    const { authorization } = req.headers;
    const jwtSecretKey = process.env.JWT_SECRET_KEY
    // const api = process.env.API_URL;

    try {
        if (isPublicRoute(req)) {
            console.log("inside public");
            return next();
        }

        console.log("inside private");
        const token = authorization.split(' ')[1];

        const data = jwt.verify(token, jwtSecretKey);

        console.log(data);
        const { reg_no, teacher_id, admin_id, dept_id, session, designation } = data;

        req.dept_id = dept_id;

        if (reg_no !== undefined) {
            req.reg_no = reg_no;
            req.session = session
        }

        else if (teacher_id !== undefined) {
            req.teacher_id = teacher_id;
            req.designation = designation;
        }
        else if (admin_id !== undefined) {
            req.admin_id = admin_id;
            req.designation = designation;
        }
        console.log(teacher_id);

        // if (!isAdmin && req.originalUrl.match(/\/api\/v1\/users(.*)/) && req.method === ('PUT')) {

        //     return next();
        // }
        // else if (!isAdmin && req.originalUrl.match(/\/api\/v1\/users(.*)/) && req.method === ('DELETE')) {
        //     return next();
        // }

        // else if (!isAdmin) {
        //     throw "UnauthorizedError";
        // }

        console.log("authorized entry");

        next();

    } catch (error) {
        next({
            name: "UnauthorizedError",
        });
    }
}

module.exports = jwtAuthentication;