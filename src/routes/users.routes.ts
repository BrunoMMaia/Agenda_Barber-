import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer( uploadConfig );

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  const userReturn = {
    name: user.name,
    email: user.email,
    id: user.id,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }

  return response.json  (userReturn);

});


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response) => {

  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file?.filename,
  });

  const userReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }

  return response.json(userReturn);

});

export default usersRouter;

