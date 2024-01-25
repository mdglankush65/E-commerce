import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
// import bcrypt from 'bcrypt';
export default async function Handle(req, res) {
    if (req.method === 'POST') {
        try {
            await mongooseConnect();
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                // res.status(401).json({ error: 'Invalid credentials' });
                return false;
            }
            // Compare the provided password with the hashed password in the database
            // const passwordMatch = await bcrypt.compare(password, user.password);
            const passwordMatch = password === user.password;
            if (passwordMatch) {
                return true;
                // res.json({ success: true });
            } else {
                return false;
                // res.json({ success: false });
                // res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
