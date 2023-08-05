import jwt from 'jsonwebtoken'

export const generateToken=({payload , signture=process.env.TOKEN_SIGNTURE ,expiresIn =60*60*24}={})=>{

    const token = jwt.sign(payload , signture ,{expiresIn})
    return token
}

export const  verifyToken = ({payload , signture=process.env.TOKEN_SIGNTURE}={})=>{

    const decoded = jwt.verify(payload, signture)
    return decoded

}