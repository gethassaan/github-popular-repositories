import { Response } from 'express';
import { STATUS_CODES } from '../constnats/common.constants';

export const RETURN_BAD_REQUEST_RESPONSE = (
  res: Response,
  message: string,
  response_status: number = STATUS_CODES.BAD_REQUEST_CODE
) => {
  return res.status(response_status).send({ error: message });
};

export const RETURN_SUCCESS_REQUEST_RESPONSE = (
  res: Response,
  message: any,
  response_status: number = STATUS_CODES.SUCCESS_REQUEST_CODE
) => {
  return res.status(response_status).send(message);
};

export const formatLanguages = (languages: string): string[] => {
  const updatedLanguages = languages.split(',');
  let formatedLanguages = '';
  for (let index = 0; index < updatedLanguages.length; index++) {
    index < updatedLanguages.length - 2
      ? formatedLanguages.concat(`language:${updatedLanguages[index]}+`)
      : formatedLanguages.concat(`language:${updatedLanguages[index]}`);
  }
  return updatedLanguages;
};

export const formatDateComparison = (dateComparison: string): string => {
  return dateComparison.toLowerCase() === 'less'
    ? (dateComparison = '<')
    : (dateComparison = '>');
};
