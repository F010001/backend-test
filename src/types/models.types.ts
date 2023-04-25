export type FileType = {
  id: string;
  name: string;
  extension: string;
  mime: string;
  size: number;
};

export type UserType = {
  id: string;
  email: string;
  password: string;
};

export type RequestFileType = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
