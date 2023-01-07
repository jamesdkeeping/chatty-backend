import { ObjectId } from 'mongodb';
import {Request, Response} from 'express';
import { create } from 'lodash';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { signupSchema } from '@auth/schemes/signup';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handlers';
import { Helpers } from '@global/helpers/helpers';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@global/helpers/cloudiary-upload';
import HTTP_STATUS from 'http-status-codes';


export class SignUp {

  @joiValidation(signupSchema)
   public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor, avatarImage} = req.body;
    const checkIfUserExists: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if(checkIfUserExists) {
      throw new BadRequestError('Invalid Credentials');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomInteger(12)}`;

    const authData: IAuthDocument = SignUp.prototype.signUpData({
        _id: authObjectId,
        uId,
        username,
        email,
        password,
        avatarColor
    });
    const result: UploadApiResponse = await uploads(avatarImage, `${userObjectId}`, true, true) as UploadApiResponse;
    if(!result?.public_id) {
      throw new BadRequestError('File upload: Error Occured. Try again');
    }

    res.status(HTTP_STATUS.CREATED).json({ message: 'User Created Successfully', authData});

   }


   private signUpData(data: ISignUpData): IAuthDocument {
        const { _id, username, email, uId, password, avatarColor} = data;
        return {
          _id,
          uId,
          username: Helpers.firstLetterUpperCase(username),
          email: Helpers.lowerCase(email),
          password,
          avatarColor,
          createdAt: new Date()
        } as IAuthDocument;
   }
}