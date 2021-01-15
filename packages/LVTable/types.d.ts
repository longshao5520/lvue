export interface TableColumn {
  prop: string;
  label: string;
  width: string;
  type: string;
}

export interface TableOptions {
  align?: "left" | "center" | "right";
  width: string;
  height: string;

  emptyText: string;

  menu?: boolean;
  menuWidth?: string;

  viewBtn?: boolean;
  editBtn?: boolean;
  delBtn?: boolean;
  viewBtnText?: string;
  editBtnText?: string;
  delBtnText?: string;

  border?: boolean;
  stripe?: boolean;

  index?: boolean;
  indexLabel?: boolean;
  indexWidth?: string;
  indexFixed?: boolean;

  selection?: boolean;

  showPagination: boolean;

  column: Array<TableColumn>;
}
