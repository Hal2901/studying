import { Companylogo } from '../assets/images';
import { CategoryParent } from '../types/categoriesType';
import { TypeSub, publicPath } from './routers';

export type IconType = {
  width?: number;
  height?: number;
  color?: string;
};

export const listBreads = [
  {
    name: 'product',
    path: '/san-pham',
  },
];

export const variationTh = [
  'infor_pr',
  'pr_th2',
  'cate_dau_tu',
  'type_pr',
  'enviroment_pr',
  'type_cap',
  'func',
];
export const categoriesTh = ['cate_1', 'cate_2', 'cate_3', 'func'];
export const categoriesSolutionTh = ['big_category', 'small_category', 'func'];

export const actionColumns = [
  'add_col_at_left',
  'add_col_at_right',
  'delete_col',
];

export const categories: CategoryParent[] = [
  {
    id: 1,
    title: 'Fiber Optic Cables',
    link: 'string',
    description: 'string',
    children: [
      {
        id: 1.1,
        title: 'Fiber Optic Cables Sub1',
        children: [
          {
            id: 1.11,
            title: 'Hệ thống mạng băng thông rộng và truy cập',
          },
          {
            id: 1.12,
            title: 'Hệ thống mạng băng thông rộng và truy cập',
          },
        ],
      },
      {
        id: 1.2,
        title: 'Fiber Optic Cables Sub2',
        children: [
          {
            id: 1.21,
            title: 'Hệ thống mạng băng thông rộng và truy cập',
          },
          {
            id: 1.22,
            title: 'Hệ thống mạng băng thông rộng và truy cập',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Fiber Optic Cables2',
    link: 'string',
    description: 'string',
    children: [
      {
        id: 1.1,
        title: 'a',
      },
      {
        id: 1.2,
        title: 'b',
      },
    ],
  },
];
export const listNameTbSpecial = ['short_category', 'des_and_spe', 'name_col'];
export const listDocuments = ['title', 'file_attack', 'upload_date'];

export const listPartnerFake = [
  {
    imageLink: Companylogo,
    companyName: 'TNHH 1 thành viên A',
    address: 'Địa chỉ: 123 Phạm Văn Đồng, Mai Dịch, Cầu Giấy, Hà Nội',
    taxCode: 'MST021362562',
    personContact: 'Nguyễn Minh Hoàng',
    hotline: '0325336258',
    email: 'nguyenminhhoang@gmail.com',
    linkMap:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296497.29167056415!2d105.90258342710258!3d20.967753321157094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad467c957b2d%3A0xb76c97588b21774!2sHH1%20Meco%20Complex!5e1!3m2!1sen!2s!4v1701486261173!5m2!1sen!2s',
  },

  {
    imageLink: Companylogo,
    companyName: 'TNHH 1 thành viên A',
    address: 'Địa chỉ: 123 Phạm Văn Đồng, Mai Dịch, Cầu Giấy, Hà Nội',
    taxCode: 'MST021362562',
    personContact: 'Nguyễn Minh Hoàng',
    hotline: '0325336258',
    email: 'nguyenminhhoang@gmail.com',
    linkMap:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4630.907839993736!2d105.77389718624158!3d21.02777413786078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134559544f5bb9d%3A0x853b14475db6cba4!2zQuG6v24gWGUgTeG7uSDEkMOsbmg!5e1!3m2!1sen!2s!4v1701486179277!5m2!1sen!2s',
  },
  {
    imageLink: Companylogo,
    companyName: 'TNHH 1 thành viên A',
    address: 'Địa chỉ: 123 Phạm Văn Đồng, Mai Dịch, Cầu Giấy, Hà Nội',
    taxCode: 'MST021362562',
    personContact: 'Nguyễn Minh Hoàng',
    hotline: '0325336258',
    email: 'nguyenminhhoang@gmail.com',
    linkMap:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4631.977151253393!2d105.86596167600514!3d20.99333168899305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac1b37f15f39%3A0xa1caa9bd661382b1!2zVGltZXMgQ2l0eSBUMTEsIDQ1OCBQLiBNaW5oIEtoYWksIEtodSDEkcO0IHRo4buLIFRpbWVzIENpdHksIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZpZXRuYW0!5e1!3m2!1sen!2s!4v1701486300604!5m2!1sen!2s',
  },
];

export const dataDocumentsFake = [
  {
    title: 'Đèn LED khởi động bật tắt Loại 6 Dây vá-Loại theo dõi từ xa',
    createdAt: '05/08/2020',
  },
  {
    title: 'Đèn LED khởi động bật tắt Loại 6 Dây vá-Loại theo dõi từ xa',
    createdAt: '05/08/2020',
  },
  {
    title: 'Đèn LED khởi động bật tắt Loại 6 Dây vá-Loại theo dõi từ xa',
    createdAt: '05/08/2020',
  },
  {
    title: 'Đèn LED khởi động bật tắt Loại 6 Dây vá-Loại theo dõi từ xa',
    createdAt: '05/08/2020',
  },
  {
    title: 'Đèn LED khởi động bật tắt Loại 6 Dây vá-Loại theo dõi từ xa',
    createdAt: '05/08/2020',
  },
  {
    title: 'Đèn LED khởi động bật tắt Loại 6 Dây vá-Loại theo dõi từ xa',
    createdAt: '05/08/2020',
  },
];

export const dataProductSpecialFake = [
  {
    title: 'Phân loại sản phẩm',
    attributes: [
      {
        categoryName: 'Tính khả dụng theo khu vực',
        description: 'Châu Á | Úc/New Zealand | Mỹ Latinh | Bắc Mỹ',
        columnName: '[Mô tả thông số cột]',
      },
      {
        categoryName: 'Tính khả dụng theo khu vực',
        description: 'Châu Á | Úc/New Zealand | Mỹ Latinh | Bắc Mỹ',
        columnName: '[Mô tả thông số cột]',
      },
      {
        categoryName: 'Tính khả dụng theo khu vực',
        description: 'Châu Á | Úc/New Zealand | Mỹ Latinh | Bắc Mỹ',
        columnName: '[Mô tả thông số cột]',
      },
    ],
  },
  {
    title: 'Thông số chung',
    attributes: [
      {
        categoryName: 'Tính khả dụng theo khu vực',
        description: 'Châu Á | Úc/New Zealand | Mỹ Latinh | Bắc Mỹ',
        columnName: '[Mô tả thông số cột]',
      },
      {
        categoryName: 'Tính khả dụng theo khu vực',
        description: 'Châu Á | Úc/New Zealand | Mỹ Latinh | Bắc Mỹ',
        columnName: '[Mô tả thông số cột]',
      },
      {
        categoryName: 'Tính khả dụng theo khu vực',
        description: 'Châu Á | Úc/New Zealand | Mỹ Latinh | Bắc Mỹ',
        columnName: '[Mô tả thông số cột]',
      },
    ],
  },
];

export const listHistories = [
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
  {
    stage: 'Giai đoạn 2020-2025',
    title: 'Tiêu đề',
    descrition:
      'LS Cable & System, được thành lập vào năm 1962, đã và đang góp phần xây dựng lưới điện và mạng lưới truyền thông đầu tiên ở Hàn Quốc và sau đó là ở các nước trên thế giới bằng cách phát triển, sản xuất và cung cấp cáp cũng như các giải pháp liên quan được sử dụng trong cuộc sống hàng ngày.',
    imageLink: '',
  },
];

export const listDistributor = [
  {
    id: 1,
    name: 'Nhà phân phối 1',
  },
  {
    id: 2,
    name: 'Nhà phân phối 2',
  },
  {
    id: 3,
    name: 'Nhà phân phối 3',
  },
];

export const solutionSubMenuFake: TypeSub[] = [
  {
    title: 'Mạng băng thông rộng',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Trung tâm dữ liệu',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Bảo mật thiết bị và phần mềm',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Mạng doanh nghiệp',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Cung cấp dịch vụ tại nhà',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Địa điểm lớn',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Mạng được quản lý',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Những dịch vụ chuyên nghiệp',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Dịch vụ chuyên nghiệp RUCKUS',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Xử lý video',
    routerPath: '',
    children: [
      {
        title: '',
        routerPath: '',
        children: [
          {
            title: 'Drop Cables',
            routerPath: '',
          },
          {
            title: 'Indoor & Outdoor Cables',
            routerPath: '',
          },
          {
            title: 'Indoor Cables',
            routerPath: '',
          },
          {
            title: 'Outside Plant Cables',
            routerPath: '',
          },
          {
            title: 'Optical Fiber',
            routerPath: '',
          },
        ],
      },
    ],
  },
];

export const resourceSubMenuFake: TypeSub[] = [
  {
    title: 'menu.resource.document',
    routerPath: publicPath.resource.index,
  },
  {
    title: 'menu.resource.policy',
    routerPath: publicPath.resource.policy,
  },
  // {
  //   title: "Chính sách bảo hành 25 năm",
  //   routerPath: "",
  // },
  {
    title: 'menu.resource.certificate',
    routerPath: publicPath.resource.certificate,
  },
  {
    title: 'menu.resource.case_study',
    routerPath: publicPath.resource.caseStudy,
  },
  {
    title: 'menu.resource.video',
    routerPath: publicPath.resource.videos,
  },
  {
    title: 'menu.resource.training',
    routerPath: publicPath.resource.training,
  },
];
export const partnerSubMenuFake: TypeSub[] = [
  {
    title: 'menu.partner.partner',
    routerPath: publicPath.partner.index,
  },
  {
    title: 'menu.partner.partner_register',
    routerPath: publicPath.partner.register,
  },
  {
    title: 'menu.partner.partner_check_certificate',
    routerPath: publicPath.partner.checking_certificate,
  },
  {
    title: 'menu.partner.project_management',
    routerPath: publicPath.partner.project_management,
  },
];
export const companySubMenuFake: TypeSub[] = [
  {
    title: 'menu.about.company',
    routerPath: publicPath.company.index,
  },
  {
    title: 'menu.about.lsvn_company',
    routerPath: publicPath.company.lsvnmessage,
  },
  {
    title: 'menu.about.history',
    routerPath: publicPath.company.history,
  },
  {
    title: 'menu.about.staff',
    routerPath: publicPath.company.staff,
  },
  {
    title: 'menu.about.news',
    routerPath: publicPath.company.news,
  },
];

export const introduceGroupLeaders = [
  {
    education: {
      1979.02: 'resume.education.1979_02',
      1969.02: 'resume.education.1969_02',
    },
    experiens: {
      2013.01: 'resume.experience.2013_01',
      2009.01: 'resume.experience.2009_01',
      2008.04: 'resume.experience.2008_04',
      2004.04: 'resume.experience.2004_04',
      2000.03: 'resume.experience.2000_03',
      1993.03: 'resume.experience.1993_03',
      1976.11: 'resume.experience.1976_11',
    },
  },
  {
    education: {
      1979.02: 'resume.education.1979_02',
      1969.02: 'resume.education.1969_02',
    },
    experiens: {
      2013.01: 'resume.experience.2013_01',
      2009.01: 'resume.experience.2009_01',
      2008.04: 'resume.experience.2008_04',
      2004.04: 'resume.experience.2004_04',
      2000.03: 'resume.experience.2000_03',
      1993.03: 'resume.experience.1993_03',
      1976.11: 'resume.experience.1976_11',
    },
  },
];

export const listMemberWebsites = [
  {
    name: 'LS GROUP',
    group: [
      {
        name: 'LS Holdings',
        link: 'https://www.lsholdings.com/en',
      },
      {
        name: 'LS ELECTRIC',
        link: 'https://www.ls-electric.com/',
      },
      {
        name: 'LS Cable & System',
        link: 'https://www.lscns.co.kr/',
      },
      {
        name: 'LS MnM',
        link: 'https://www.lsmnm.com/',
      },
      {
        name: 'LS Mtron',
        link: 'https://www.lsmtron.com/us/en',
      },
      {
        name: 'E1',
        link: 'https://www.e1.co.kr/ko/main',
      },
      {
        name: 'LS Networks',
        link: 'https://www.lsnetworks.co.kr/eng/',
      },
      {
        name: 'YESCO',
        link: 'https://www.lsyesco.com/',
      },
      {
        name: 'LS Global',
        link: 'http://www.lsglobalinc.com/document/ceo_eng',
      },
      {
        name: 'LS I&D',
        link: 'http://www.ls-ind.co.kr/en/index.asp',
      },
    ],
  },
  {
    name: 'SUBSIDIARIES',
    group: [
      {
        name: 'GAON',
        link: 'https://www.gaoncable.com/default2',
      },
      {
        name: 'LS Buildwin',
        link: 'https://www.lsbuildwin.com:40041/?lang=en',
      },
      {
        name: 'G&P',
        link: '',
      },
      {
        name: 'SEJONG',
        link: 'http://www.sejongcable.co.kr/',
      },
      {
        name: 'G&P WOOD',
        link: 'http://www.gnpwood.com/',
      },
      {
        name: 'LS EV Korea',
        link: 'https://www.lsevkorea.com:40010/?enc=&lang=en',
      },
      {
        name: 'LS Materials',
        link: 'https://www.lscns.co.kr/en/main.asp',
      },
      {
        name: 'LS Alsco',
        link: 'http://www.alsco.co.kr/?enc=&lang=en',
      },
      {
        name: 'LS HongQi Cable & System',
        link: 'https://lshqcable.com/en/about/ls_hongqi_cable_system',
      },
      {
        name: 'LS Eco Energy',
        link: 'https://lsecoenergy.com/en/front',
      },
      {
        name: 'LS VINA',
        link: 'https://lsvinacns.vn/',
      },
      {
        name: 'LS Cable & System Vietnam',
        link: 'http://lscns.vn/',
      },
      {
        name: 'LS Cable & System USA',
        link: 'https://www.lscsusa.com/',
      },
      {
        name: 'LS Cable & System EU',
        link: 'https://www.lscable.eu/front',
      },
      {
        name: 'LS Cable & System India',
        link: 'https://lscable.in/front',
      },
      {
        name: 'LSGM',
        link: 'https://www.lsgmcable.com/',
      },
      {
        name: 'LS Electric Vietnam',
        link: 'https://ls-electric.com.vn/',
      },
    ],
  },
  {
    name: 'BRAND SITES',
    group: [
      {
        name: 'LS RTS',
        link: 'https://www.lsrts.com/',
      },
      {
        name: 'LS SIMPLE',
        link: 'https://www.lssimple.com/en/index.asp',
      },
    ],
  },
];

export const listIconContact = [
  {
    text: 'contact_address',
    type: 'address',
  },
  {
    text: '02513569140',
    type: 'phone',
  },
  {
    text: 'MST: 3600840729',
    type: 'info',
  },
  {
    text: 'https://lscns.vn/',
    type: 'link-web',
  },
];

export const listBranches = [
  {
    office: 'list_branches.office_1.office',
    representative: 'list_branches.office_1.representative',
    department: 'list_branches.office_1.department',
    position: 'list_branches.office_1.position',
    phone: '0961986686',
    email: 'ducdt@lscv.com.vn',
    address: 'list_branches.office_1.address',
    factory: 'list_branches.factory',
    factory_address: 'list_branches.factory_address',
    factory_phone: '02513569140',
  },
  {
    office: 'list_branches.office_2.office',
    representative: 'list_branches.office_2.representative',
    department: 'list_branches.office_2.department',
    position: 'list_branches.office_2.position',
    phone: '039 6954779',
    email: 'luchht@lscv.com.vn',
    address: 'list_branches.office_2.address',
    factory: 'list_branches.factory',
    factory_address: 'list_branches.factory_address',
    factory_phone: '02513569140',
  },
  {
    office: 'list_branches.office_3.office',
    representative: 'list_branches.office_3.representative',
    department: 'list_branches.office_3.department',
    position: 'list_branches.office_3.position',
    phone: '0904678790',
    email: 'longtt@lscv.com.vn',
    address: 'list_branches.office_3.address',
    factory: 'list_branches.factory',
    factory_address: 'list_branches.factory_address',
    factory_phone: '02513569140',
  },
];
