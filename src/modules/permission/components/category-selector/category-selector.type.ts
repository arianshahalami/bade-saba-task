import type { IAccessTypes } from "@/modules/permission";

export interface ICategory {
   id: string;
   productId?: string;
   name: string;
   children?: ICategory[];
}

export interface ICategorySelectorProps {
   readonly selectedProductId: string;
   readonly selectedCategories: string[];
   readonly onSelectCategory: (selectedCategories: string[], newCategoryAccess: Record<string, IAccessTypes>) => void;
   readonly categoriesAccess: Record<string, IAccessTypes>;
}

export interface IInfiniteNestedCategoryListProps {
   readonly categoryData: ICategory;
   readonly categoriesAccess: Record<string, IAccessTypes>;
   readonly selectedCategories: string[];
   readonly isParent: boolean;
   readonly onCheck: (selectedCategoryData: string[], newCategoryAccess: Record<string, IAccessTypes>) => void;
}
