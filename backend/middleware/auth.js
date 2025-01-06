import jwt from 'jsonwebtoken'

const authUser = async(req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ success: false, message: "Token is required" })
    }
}

export default authUser