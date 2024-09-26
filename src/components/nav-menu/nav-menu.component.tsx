import styles from "./nav-menu.module.scss";

export interface INavMenuItem {
   name: string;
   id: string;
}

interface INavMenuProps {
   readonly items: INavMenuItem[];
   readonly onItemClick: (itemData: INavMenuItem) => void;
   readonly activeItem: INavMenuItem;
}

export const NavMenu = (props: INavMenuProps) => {
   const { items, onItemClick, activeItem } = props;
   return (
      <ul className={styles.navMenuList}>
         {items.map((item) => (
            <li
               key={item.id}
               className={
                  activeItem.id === item.id
                     ? [styles.navMenuItem, styles.navMenuItemActive].join(" ")
                     : styles.navMenuItem
               }
               onClick={() => {
                  onItemClick(item);
               }}
            >
               {item.name}
            </li>
         ))}
      </ul>
   );
};
