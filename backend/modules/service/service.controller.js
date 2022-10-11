const ServiceModel = require('./service');
const HTTPError = require('../../common/httpError');

const getService = async (req, res, next) => {

    const service = await ServiceModel.find({});
    res.send({ success: 1, data: service });
}

const createService = async (req, res) => {
    const senderUser = req.user;
    const { name, imageUrl, time, price, note, status } = req.body;
    const newService = await ServiceModel.create({
        _id: await getNext(),
        name,
        imageUrl,
        time,
        price,
        note,
        status,
        createBy: senderUser._id
    });
    res.send({ success: 1, data: newService });
}

const updateService = async (req, res) => {
    const senderUser = req.user;
    const { serviceId } = req.params;
    const { name, imageUrl, time, price, note, status } = req.body;

    const existService = await ServiceModel.findOne({ _id: serviceId });
    if (!existService) {
        throw new HTTPError(400, 'Not found service');
    }

    const updatedService = await ServiceModel
        .findByIdAndUpdate(serviceId, {
            name,
            imageUrl,
            time,
            price,
            note,
            status,
            modifyBy: senderUser._id
        }, { new: true });

    res.send({ success: 1, data: updatedService });
}

const getServiceById = async (req, res) => {
    const { serviceId } = req.params;

    const service = await ServiceModel.findById(serviceId);

    res.send({ success: 1, data: service });
}

const updateStatus = async (req, res) => {
    const senderUser = req.user;
    const { serviceId, status } = req.params;

    const existService = await ServiceModel.findOne({ _id: serviceId });
    if (!existService) {
        throw new HTTPError(400, 'Not found service');
    }

    const updatedService = await ServiceModel
        .findByIdAndUpdate(serviceId, {
            status,
            modifyBy: senderUser._id
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