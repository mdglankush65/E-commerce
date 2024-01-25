import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
export default async function handle(req, res) {
    if (req.method === 'POST') {
        try {
            await mongooseConnect();
            const { firstname, lastname, email, password } = req.body;
            const newUser = new User({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            });
            const user = await User.findOne({ email: email });
            if (user) {
                res.status(401).json({ error: 'User Already Exists' });
                return;
            }
            await newUser.save();
            res.status(201).json({ message: 'User added successfully' });
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}