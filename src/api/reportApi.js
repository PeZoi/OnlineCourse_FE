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

// Lấy thông số tổng số tiền theo category
export const getCategoryIncomeAPI = () => {
   return axios
      .get(`/api/report/category-income`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Lấy thông số tổng số tiền theo course
export const getCourseIncomeAPI = (period) => {
   return axios
      .get(`/api/report/course-income/${period}`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};

// Lấy thông số contest
export const getContestReportAPI = () => {
   return axios
      .get(`/api/report/contest-report`)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         return err;
      });
};
