const registrationSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
});
