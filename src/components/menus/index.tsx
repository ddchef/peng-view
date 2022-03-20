import { RouterLink } from 'vue-router';
import { NIcon, NMenu } from 'naive-ui';
import type { DefineComponent } from 'vue';
import type { MenuOption } from 'naive-ui';
import type { Navigation } from '../../routes/config';

interface Props {
  menus: Navigation[]
}
const renderIcon = (Icon: DefineComponent) => (
  <NIcon>
    <Icon />
  </NIcon>
);

const renderHref = (nav: Navigation) => (
  <a href={nav.href} target="_blank" ref='noopenner noreferrer'>{nav.title}</a>
);

const renderLabel = (nav: Navigation) => {
  if (nav.type === 'group') {
    return nav.title;
  }
  if (nav.href) {
    return renderHref(nav);
  }
  return (
    <RouterLink to={{ name: nav.name, path: nav.path as string }}>
      {nav.title}
    </RouterLink>
  );
};

const NavigationToMenuOption = (navigation: Navigation[]): MenuOption[] => navigation.map((_n) => {
  if (_n.type === 'group') {
    return {
      label: () => renderLabel(_n),
      key: _n.id,
      children: NavigationToMenuOption(_n.children as Navigation[]),
    };
  }
  return {
    label: () => renderLabel(_n),
    key: _n.id,
  };
});

const MainMenus = (props: Props) => {
  const menuOption = NavigationToMenuOption(props.menus);
  console.log(menuOption);
  return (
    <NMenu options={menuOption}></NMenu>
  );
};

export default MainMenus;
