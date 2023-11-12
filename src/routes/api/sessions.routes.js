import { Router } from 'express';
import UserManager from '../../dao/mongomanagers/userManager.js';
import bcrypt from "bcrypt"
import passport from 'passport';
import { generateToken } from '../../jwt/token.js';

export const dbM = new UserManager()

// Importar todos los routers;
export const router = Router();
let encryptRounds = 1


router.post("/login", async (req, res) => {
        const { email, password } = req.body

        if (email == undefined || password == undefined) return res.status(400).json({ success: false, error: "Faltan datos" })

        let finded = await dbM.findUserByEmail(email.toString().toLowerCase())

        if (!finded.success) return res.status(200).json({ success: false, error: "usuario no encontrado" })
        let user = JSON.parse(JSON.stringify(finded.success))

    const token = generateToken(res, email, password);
    res.json({token, user: {email:user.email, adminRole: user.adminRole}});
});


router.get("/logout", async (req, res) => {
    req.session.destroy((error) =>{
        if(error)
        {
            return res.json({ status: 'Logout Error', body: error})
        }
        res.redirect('../../login')
    })    
})



router.post("/register",passport.authenticate("signup"), async (req, res) => {

    if (req.user) res.status(200).json({ result: req.user })

})

router.get('/github',passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/githubcallback',  passport.authenticate('github'),async (req, res) => {
    if (req.user) res.redirect("../../products")

})