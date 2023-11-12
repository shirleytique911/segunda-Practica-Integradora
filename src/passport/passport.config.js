import passport from "passport"
import jwt from "passport-jwt"

const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt
const cookieExtractor = req =>{
    let token = null
    if(req && req.cookies){
        token = req.cookies["token"]
    }
    return token
}
const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'Secret-key'
    }, async(jwt_payload, done)=>{
        try{
            return done(null, jwt_payload)
        }
        catch(err){
            return done(err)
        }
    }
    ))
}
export default initializePassport