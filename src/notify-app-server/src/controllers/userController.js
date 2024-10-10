import User from '../models/user.js'

class UserController {
    async getOne(req, res) {
        const id = req.params.id;
        const user = await User.findOne({where: {user_id: id}});
        res.json(user);
    }
}

export default new UserController();