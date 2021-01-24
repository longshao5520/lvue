export interface TableColumn {
  prop: string;
  label: string;
  width: string;
  type?: "text" | "img" | "link";
}

export interface TableOptions {
  align?: "left" | "center" | "right";
  width: string;
  height: string;

  headerBg: string;
  headerColor: string;

  emptyIcon: string;
  emptyText: string;

  menu: boolean;
  menuType?: "icon" | "button" | "text";
  menuTitle: string;
  menuWidth: string;
  menuFixed: boolean;

  viewBtn: boolean;
  editBtn: boolean;
  delBtn: boolean;

  viewBtnText: string;
  editBtnText: string;
  delBtnText: string;

  viewBtnIcon: string;
  editBtnIcon: string;
  delBtnIcon: string;

  border: boolean;
  stripe: boolean;

  index: boolean;
  indexTitle: boolean;
  indexWidth: string;
  indexFixed: boolean;

  selection: boolean;

  pagination: boolean;

  column: Array<TableColumn>;
}
