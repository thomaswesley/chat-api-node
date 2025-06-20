import dotenv from 'dotenv';
dotenv.config();
const saveMessage = async (message) => {
    try {
        console.log(message);
        return [];
    }
    catch (error) {
        return error;
    }
};
const getMessages = async () => {
    try {
        return [];
    }
    catch (error) {
        return error;
    }
};
const Properties = {
    saveMessage,
    getMessages,
};
export default Properties;
