import { getRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';
import fs from 'fs';

interface Request{
  user_id: string;
  avatarFilename?: string;
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user){
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if(user.avatar){
      //deletar avatar anterior
      const useraAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      //stat verifica se o arquivo existe
      const userAvatarFileExists = await fs.promises.stat(useraAvatarFilePath);

      if(userAvatarFileExists){
        await fs.promises.unlink(useraAvatarFilePath);
      }
    }

    if (avatarFilename){
      user.avatar = avatarFilename;
      await usersRepository.save(user);

    }


    return user;


  }
}

export default UpdateUserAvatarService;
