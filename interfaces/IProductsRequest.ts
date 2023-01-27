import IProduct from './IProduct';

export default interface IProductsRequestInfo {
    totalItems: number;
    page: number;
    perPage: number;
    products: Array<IProduct>;
}