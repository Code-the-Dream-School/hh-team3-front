import axios from "axios";

const getData = async (url, params) => {
  try {
    let res = await axios.get(url, params);
    return res.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

const getAllData = async (url) => {
  try {
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

export { getData, getAllData };

