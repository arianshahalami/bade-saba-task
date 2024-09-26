import type { IAccessTypes } from "@/modules/permission";
import type { ICategory } from "@/modules/permission/components/category-selector/category-selector.type.ts";

export interface ICategoryAccessListProps {
   readonly selectedCategories: string[];
   readonly categoriesAccess: Record<string, IAccessTypes>;
   readonly onAccessChange: (accessLvl: IAccessTypes, categoryId: string) => void;
}

export interface ICategoryAccessListItemProps {
   readonly eventKey: string;
   readonly categoryData: ICategory;
   readonly onAccessChange: (accessLvl: IAccessTypes, categoryId: string) => void;
   readonly categoryAccess?: IAccessTypes;
}
