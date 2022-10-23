const ServiceModel = require('./service');
const ConsumableModel = require('../consumable/consumable');
const PrescriptionModel = require('../prescription/prescription');
const HTTPError = require('../../common/httpError');

const getService = async (req, res, next) => {

    const service = await ServiceModel.find({});
    res.send({ success: 1, data: service });
}

const createService = async (req, res) => {
    //const senderUser = req.user;
    const { name, imageUrl, time, price, note, status, consumable, prescription } = req.body;
    const _id = await getNext();
    // const imgUrl = req.file.path;
    const newService = await ServiceModel.create({
        _id: _id,
        name,
        // imageUrl: imgUrl,
        time,
        price,
        note,
        status,
        //createBy: senderUser._id
    });

    const consumableArray = JSON.parse(JSON.stringify(consumable));
    consumableArray.forEach(async (element) => {
        await ConsumableModel.create({
            serviceId: _id,
            medicineId: element.medicineId,
            uses: element.uses,
            numberOfUses: element.numberOfUses,
            //createBy: senderUser._id,
        });
    });

    const prescriptionArray = JSON.parse(JSON.stringify(prescription));
    prescriptionArray.forEach(async (element) => {
        await PrescriptionModel.create({
            serviceId: _id,
            medicineId: element.medicineId,
            quantity: element.quantity,
            usage: element.usage,
            //createBy: senderUser._id,
        });
    });

    const fullService = {...newService._doc,consumableArray,prescriptionArray};
    res.send({ success: 1, data: fullService });
}

const updateService = async (req, res) => {
    //const senderUser = req.user;
    const { serviceId } = req.params;
    const { name, imageUrl, time, price, note, status, consumable, prescription } = req.body;
    const imgUrl = req.file.path;
    const existService = await ServiceModel.findOne({ _id: serviceId });
    if (!existService) {
        throw new HTTPError(400, 'Not found service');
    }

    const updatedService = await ServiceModel
        .findByIdAndUpdate(serviceId, {
            name,
            imageUrl: imgUrl,
            time,
            price,
            note,
            status,
            //modifyBy: senderUser._id
        }, { new: true });

    await ConsumableModel.deleteMany({serviceId: serviceId});
    const consumableArray = JSON.parse(JSON.stringify(consumable));
    consumableArray.forEach(async (element) => {
        await ConsumableModel.create({
            serviceId: serviceId,
            medicineId: element.medicineId,
            uses: element.uses,
            numberOfUses: element.numberOfUses,
            //createBy: senderUser._id,
        });
    });

    await PrescriptionModel.deleteMany({serviceId: serviceId});
    const prescriptionArray = JSON.parse(JSON.stringify(prescription));
    prescriptionArray.forEach(async (element) => {
        await PrescriptionModel.create({
            serviceId: serviceId,
            medicineId: element.medicineId,
            quantity: element.quantity,
            usage: element.usage,
            //createBy: senderUser._id,
        });
    });

    const fullService = {...updateService._doc,consumableArray,prescriptionArray};
    res.send({ success: 1, data: fullService });
}

const getServiceById = async (req, res) => {
    const { serviceId } = req.params;

    const service = await ServiceModel.findById(serviceId);
    const consumable = await ConsumableModel.find({serviceId: serviceId});
    const prescription = await PrescriptionModel.find({serviceId: serviceId});
    const consumableArray = JSON.parse(JSON.stringify(consumable));
    const prescriptionArray = JSON.parse(JSON.stringify(prescription));

    if(!service){
        throw new HTTPError(400, 'Not found service');
    }

    const fullService = {...service._doc,consumableArray,prescriptionArray};
    res.send({ success: 1, data: fullService });
}

const updateStatus = async (req, res) => {
    // const senderUser = req.user;
    const { serviceId, status } = req.params;

    const existService = await ServiceModel.findOne({ _id: serviceId });
    if (!existService) {
        throw new HTTPError(400, 'Not found service');
    }

    const updatedService = await ServiceModel
        .findByIdAndUpdate(serviceId, {
            status,
            // modifyBy: senderUser._id
        }, { new: true });

    res.send({ success: 1, data: updatedService });
}

const getNext = async () => {
    const count = await ServiceModel.find().count();
    if(count<=0) return 'DV_0000000001';

    const lastService = await ServiceModel.find().sort({_id: -1}).limit(1);
    const nextId = lastService[0]._id;
    const idNumber = (parseInt(nextId.split('_')[1])+1)+'';
    var temp = '';
    for(let i=0; i < (10-idNumber.length); i++){
        temp+='0';
    }
    temp+=idNumber;
    return 'DV_'+temp;
}

module.exports = {
    getService,
    createService,
    updateService,
    getServiceById,
    updateStatus,
}