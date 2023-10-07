export interface UserReg {
  id: string
  email: string,
  username: string,
  name: {
    firstname: string,
    lastname: string
  },
  address: {
    country: string
  },
  phone: string
}
