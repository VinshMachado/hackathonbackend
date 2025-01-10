import chats from "../schma/chatschma.js";

const insertchats = async (req, res) => {
  try {
    const { name, report, link } = req.body;

    const chat = new chats({ name: name, report: report, link: link });
    const data = await chat.save();
    res.send(data).status(200);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const getchats = async (req, res) => {
  try {
    const data = await chats.find();
    console.log(data);
    res.send(data).status(200);
  } catch (e) {
    console.log(e);
  }
};
export default { insertchats, getchats };
