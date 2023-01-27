import IProduct from './IProduct';

export default interface IProductList {
  totalItems: number;
  page: number;
  perPage: number;
  products: Array<IProduct>;
}
