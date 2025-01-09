import mongoose from "mongoose";
import express from "express";
import donationlist from "../schma/donation.js";
import QRCode from "qrcode";

const insert = async (req, res) => {
  const { name, desc, upiId, amount } = req.body;
  const upiString = `upi://pay?pa=${upiId}&am=${amount}`;

  try {
    const qrCode = await QRCode.toDataURL(upiString);
    const data = new donationlist({
      name: name,
      desc: desc,
      upiId: upiId,
      amount: amount,
      qrcode: qrCode,
    });
    const inserted = await data.save();
    console.log(inserted);
    res.send({ qrCode });
  } catch (e) {
    console.log(e);
  }
};

export default { insert };
