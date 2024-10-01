import user from '../models/user.js';

class UserController {
    async create(req, res) {
        const {name, email, password} = req.body;
        const newUser = await user.create({name, email, password});
        res.json(newUser);
    }

    async getAll(req, res) {
        const users = await user.findAll();
        res.json(users);
    }

    async getOne(req, res) {
        const id = req.params.id;
        const user = await user.findOne({where: {id}});
        res.json(user);
    }
}

export default new UserController();