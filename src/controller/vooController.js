const mongoose = require('mongoose');
const State = require('../model/state');
const Voo = require('.../model/voo');
const { validationResult, matchedData } = require('express-validator');

module.exports = {
    getStates: async (req, res) => {
        let states = await State.find({});
        if (!states) {
            return res.status(404).json({ message: 'States not found' });
        }
        res.json(states);
    },
    getVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }

        const data = matchedData(req);
        let update = {};
        if (data.name) {
            update.name = data.name;
        }

        if (data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if (emailCheck) {
                return res.status(422).json({ error: 'Email already exists' });
            }
            update.email = data.email;
        }

        if (data.state) {
            if(mongoose.Types.ObjectId.isValid(data.state)) {
                const stateCheck = await State.findById(data.state);
                if (!stateCheck) {
                    return res.status(422).json({ error: 'State not found' });
                }
                update.state = data.state;
            }else{
                res.status(422).json({ error: 'Invalid state' });
                return;
            }
        }

        if (data.passwordHash) {
            update.passwordHash = await bcrypt.hash(data.passwordHash, 10);
        }

        if (data.phone) {
            update.phone = data.phone;
        }

        if (data.address) {
            update.address = data.address;
        }

        if (data.idade) {
            update.idade = data.idade;
        }

        await Voo.findByIdAndUpdate({token: data.token}, {$setUpdate: update});
        res.json({ message: 'User updated successfully' });

        let voo = await Voo.find({});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(voo);
    }
};