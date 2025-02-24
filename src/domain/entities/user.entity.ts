export class User {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public phone?: string,
  ) {}
}
