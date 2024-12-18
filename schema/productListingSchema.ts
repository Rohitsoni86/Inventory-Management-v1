import * as Yup from 'yup';

const ProductListingSchema = Yup.object({
  productName: Yup.string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters'),
  
  productCategory: Yup.string()
    .required('Product category is required')
    .min(3, 'Product category must be at least 3 characters'),
  
  productBrand: Yup.string()
    .required('Product brand is required')
    .min(3, 'Product brand must be at least 3 characters'),
  
  productCode: Yup.string()
    .required('Product code is required')
    .min(3, 'Product code must be at least 3 characters'),
  
  productDescription: Yup.string()
    .required('Product description is required')
    .min(10, 'Product description must be at least 10 characters'),
  
  productType: Yup.string()
    .required('Product type is required')
    .oneOf(
      ['standard', 'variable', 'service', 'combo', 'other'],
      'Invalid product type'
    ),
  
  productCost: Yup.number()
    .required('Product cost is required')
    .positive('Product cost must be a positive number')
    .typeError('Product cost must be a valid number'),
  
  productPrice: Yup.number()
    .required('Product selling price is required')
    .positive('Product selling price must be a positive number')
    .typeError('Product selling price must be a valid number'),
  
  productUnit: Yup.string()
    .required('Product unit is required')
    .oneOf(
      ['kilogram', 'meter', 'piece', 'centimeter', 'inch'],
      'Invalid product unit'
    ),
  
  productSaleUnit: Yup.string()
    .required('Sale unit is required')
    .oneOf(
      ['kilogram', 'meter', 'centimeter', 'inch'],
      'Invalid sale unit'
    ),
  
  productPurchaseUnit: Yup.string()
    .required('Purchase unit is required')
    .oneOf(
      ['kilogram', 'meter', 'centimeter', 'inch'],
      'Invalid purchase unit'
    ),
  
  productQuantity: Yup.string()
    .required('Product quantity is required')
    .matches(
      /^[0-9]+(?:\/[0-9]+)?$/,
      'Product quantity must be a valid format (e.g., 100/200)'
    ),
  
  selectedImage: Yup.mixed().nullable(),
  
  imageUrl: Yup.string().url('Must be a valid URL').nullable(),
  
  hospitalLogo: Yup.string().url('Must be a valid URL').nullable(),
});

export default ProductListingSchema;
