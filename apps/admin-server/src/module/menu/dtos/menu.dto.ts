export class MenuDTO {
  id: number;

  menuName: string;

  parentId: number;

  icon: string;

  showStatus: number;

  menuLevel: number;

  menuUrl: string;

  path: string;

  subList: MenuDTO[];
}
