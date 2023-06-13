import { Request, Response } from 'express';
import User from '../models/user';
import { comparePassword, encryptPassword } from '../helper/bcrypt';
import { generateToken } from '../helper/jwt';
import { JwtPayload } from 'jsonwebtoken';

interface ExtendedRequest extends Request {
    user?: string | JwtPayload;
}


const registerCtrl = async (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    try {
        //Verificamos que el email no exista
        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            });
        }

        //Encriptamos la contraseña
        const passwordHash = await encryptPassword(password);
        

        //Creamos el usuario
        const newUser = await User.create({
            name,
            email,
            password: passwordHash
        });

        res.status(201).json({
            ok: true,
            user: newUser
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }

}

const loginCtrl = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body;

        //Verificamos que el usuario exista
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        //Verificamos que la contraseña sea correcta
        const passwordCompare = await comparePassword(password, userExist.password);

        if(!passwordCompare){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generateToken(userExist.id);
        
        res.status(200).json({
            ok: true,
            msg: 'Login correcto',
            user: userExist,
            token
        });

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }


}

const validateCtrl = async (req: ExtendedRequest, res: Response) => {
    //Mandamos el user
    const user = await User.findById(req.user);

    if(!user){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'
        });
    }

    //Mantenemos la sesion activa
    const token = await generateToken(user.id);
    

    res.status(200).json({
        ok: true,
        user,
        token
    })
    

    //Buscamos el usuario por el id
    // const user = await User.findById(req.user);

    // if(!user){
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'El usuario no existe'
    //     });
    // }

    //Mantenemos la sesion activa
    // const token = await generateToken(user.id);

    // res.status(200).json({
    //     ok: true,
    //     user,
    //     token
    // });

}

export {
    registerCtrl,
    loginCtrl,
    validateCtrl,
}