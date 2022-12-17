const BillModel = require("./bill");
const ProfileModel = require("../profile/profile");
const PaymentModel = require("../payment/payment");
const HTTPError = require("../../common/httpError");

const getBillByMedicalPaper = async (req, res) => {
  const { medicalPaperId } = req.query;
  const bill = await BillModel.find({
    medicalPaperId: medicalPaperId,
  });

  const tempBill = [];
  await Promise.all(
    bill.map(async (element) => {
      const temp = await ProfileModel.findById(element.employeeId);
      let tempObject = {};
      tempObject = {
        ...element._doc,
        nameEmployee: temp.fullname,
      };

      const tempPayment = await PaymentModel.findById(element.paymentId);
      tempObject = {
        ...tempObject,
        namePayment: tempPayment.name,
      };
      tempBill.push(tempObject);
    })
  );
  res.send({ success: 1, data: tempBill });
};

const inputBill = async (req, res) => {
  const senderUser = req.user;
  const { billMedical } = req.body;

  let billArray = JSON.parse(JSON.stringify(billMedical));

  await Promise.all(
    billArray.map(async (element) => {
      if (
        element._id === "null" ||
        !element ||
        element._id === "undefined" ||
        element._id.length < 1
      ) {
        console.log(1);
        await BillModel.create({
          medicalPaperId: element.medicalPaperId,
          employeeId: element.employeeId,
          amount: element.amount,
          paymentId: element.paymentId,
          createAt: element.createAt,
        });
      }
    })
  );

  const bill = await BillModel.find({
    medicalPaperId: billArray[0].medicalPaperId,
  });
  res.send({ success: 1, data: bill });
};

module.exports = {
  getBillByMedicalPaper,
  inputBill,
};
