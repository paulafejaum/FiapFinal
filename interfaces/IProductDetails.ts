import IProductStore from './IProductStore';

export default interface IProductDetails {
    _id: string;
    name: string;
    price: string;
    favorite: boolean;
    stores: Array<IProductStore>;
    createdDate: string;
    updatedDate: string;
}

