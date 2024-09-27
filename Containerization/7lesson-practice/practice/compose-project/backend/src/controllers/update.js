const axios = require('axios');
const models = require('../db/models');
const Sequelize = require('sequelize');

const MAIN_URL =
  'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/';

exports.getPerformUpdate = async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date();
    const updateRec = await lastUpdate();
    if (updateRec) {
      startDate.setDate(updateRec.date_value.getDate() + 1);
    }
    let output = await axios.get(buildApiString(startDate, endDate));
    if (!output.data.data) {
      return res.status(204).json({ message: '"Already updated' });
    }
    result = await insertStatData(output.data.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error perfoming update' });
  }
};

exports.getLastUpdate = async (req, res, next) => {
  try {
    const updateRec = await lastUpdate();
    if (updateRec) {
      return res.status(200).json(updateRec);
    }
    return res.status(204).json({ message: 'Updates not found in this year' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Error quering countries' });
  }
};

exports.getHealth = async (req, res, next) => {
  return res.status(200).json({ message: 'OK' });
};

const lastUpdate = async () => {
  const year = new Date().getFullYear();
  startDate = new Date(year, 0, 1);
  endDate = new Date(year, 11, 31);
  const updateRec = await models.Upgrade.findOne({
    order: [['date_value', 'DESC']],
    where: {
      date_value: {
        [Sequelize.Op.between]: [startDate, endDate],
      },
    },
  });
  return updateRec;
};

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const buildApiString = (startDate, endDate) => {
  return MAIN_URL + formatDate(startDate) + '/' + formatDate(endDate);
};

const strToDate = (dateString) => {
  let [year, mon, day] = dateString.split('-').map((c) => parseInt(c));
  return new Date(year, mon - 1, day);
};

const insertStatData = async (data) => {
  const insertionData = [];
  for (const key of Object.keys(data)) {
    for (const key_nest of Object.keys(data[key])) {
      insertionData.push(data[key][key_nest]);
    }
  }
  const result = await models.CovStat.bulkCreate(insertionData);
  const updateDate = strToDate(Object.keys(data).reverse()[0]);
  const updateCount = Object.keys(data).length;
  if (result && updateDate) {
    const newUpdRec = await models.Upgrade.create({
      date_value: updateDate,
      records: updateCount,
    });
    return true;
  }
  return false;
};
