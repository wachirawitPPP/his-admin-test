export interface menuType {
  mng_id: string;
  mng_name_th: string;
  mng_name_en: string;
  mng_icon: string;
  mng_sort: number;
  mng_status: number;
  mng_delete: string;
  app_id: number;
  action: any;
}

export interface SubMenuType {
  app_id: number;
  id: number;
  menu_group_id: number;
  mn_id: string;
  mn_name_en: string;
  mn_name_th: string;
  mn_sort: number;
  mn_status: number;
  mn_target: string;
  mn_url:string;
  action: any;
}
