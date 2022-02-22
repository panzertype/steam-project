export interface User {
  email: string;
  password: string;
  username?: string;
  library?: Array<any>;
  friends?: Array<any>;
}
