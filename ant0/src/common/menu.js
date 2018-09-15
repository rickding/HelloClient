const menuData = [{
  name: 'PMO报表数据',
  icon: 'table',
  path: 'report-data',
  children: [
    {
      name: '更新数据（周五）',
      path: 'update-data',
    },
    {
      name: '人天交付运营能力',
      path: 'weekly-release',
    },
    {
      name: '人天交付运营能力_人力库存',
      path: 'weekly-release-manday',
    },
    {
      name: '计划开始',
      path: 'weekly-start-plan',
    },
    {
      name: '计划开始_人力库存',
      path: 'weekly-start-plan-manday',
    },
    {
      name: '计划交付',
      path: 'weekly-release-plan',
    },
    {
      name: '计划交付_人力库存',
      path: 'weekly-release-plan-manday',
    },
    {
      name: '未完成开发',
      path: 'release-plan',
    },
    {
      name: '未完成开发_人力库存',
      path: 'release-plan-manday',
    },
    {
      name: 'check',
      path: 'chk',
    },
  ],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
