import axios from 'axios';
import { LANGUAGE_VERSIONS } from 'src/utils/constant';

export const executeCodeAPI = (language, sourceCode) => {
   return axios.post('https://emkc.org/api/v2/piston/execute', {
      language: language,
      version: LANGUAGE_VERSIONS.find((lang) => lang.name === language)?.version,
      files: [
         {
            content: sourceCode,
         },
      ],
   });
};
