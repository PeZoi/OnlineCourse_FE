import axios from 'src/utils/axios';

// Lấy ra các thông số tổng quát
export const getGeneralDataAPI = () => {
   return axios
      .get(`/api/report/count`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Lấy thông số tổng số tiền kiếm được
export const getSaleIncomeDataByPeriodAPI = (period) => {
   return axios
      .get(`/api/report/sales-income/${period}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// CCC => Category, Course, Contest (Lấy ra các số liệu của 3 cái)
export const getCCCDataByPeriodAPI = (groupBy, period) => {
   return axios
      .get(`/api/report/sales/${groupBy}/${period}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
